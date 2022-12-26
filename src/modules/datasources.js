import { getLogger } from '../lib/logger';
const logger = getLogger('datasources-module');
import { fetch } from '../lib/http';
import Exceptions from '../lib/exceptions';
import { rowsToCSV, rowsToNDJSON } from '../lib/utils';
import FormData from 'form-data';
import fs from 'fs';

/**
 * @module tinybird-sdk/datasources
 */
export default {
    /**
     * Get all datasources
     * 
     * @function getAllDatasources
     * @return { Promise<object> } All datasources available
     */
    getAllDatasources: async () => {
        try {
            return await fetch('/v0/datasources');
        } catch (error) {
            logger.error('Error while fetching /v0/datasources');
            logger.debug('Request: /v0/datasources/');
            logger.debug(error);
        }
    },

    /**
     * Get datasource detail by name
     * 
     * @function getDatasource
     * @param  { string } name Datasource name
     * @return { Promise<object> } Datasource details
     */
    getDatasource: async name => {
        try {
            return await fetch(`/v0/datasources/${name}`);
        } catch (error) {
            logger.error('Error while fetching /v0/datasources');
            logger.debug(`Request: /v0/datasources/${name}`);
            logger.debug(error);
        }
    },

    /**
     * Create new datasource
     * 
     * @function createDatasource
     * @param  { string } name Datasource name
     * @param  { string } schema Datasource schema following this notation https://docs.tinybird.co/api-reference/datasource-api.html#create-from-schema
     * @return { Promise<object> } Datasource details
     */
    createDatasource: async (name, schema) => {
        try {
            const params = new URLSearchParams();
            params.append('name', name);
            params.append('schema', schema);
            params.append('format', schema.includes('`json:') ? 'ndjson' : 'csv');

            const result = await fetch('/v0/datasources', {
                method: 'POST',
                body: params
            });
            logger.debug(`Datasource created: ${name}`);
            return result;
        } catch (error) {
            logger.error(`Error while creating datasource ${name}`);
            logger.debug('Request: /v0/datasources/');
            logger.debug(error);
        }
    },


    /**
     * Create new datasource from file
     * 
     * @function createDatasourceFromFile
     * @param  { string } name Datasource name
     * @param  { object } filePath Path to file
     * @return { Promise<boolean> } Result as boolean
     */
    createDatasourceFromFile: () => {
        // TODO: implement
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },

    /**
     * Alter existing datasource schema
     * 
     * @function alterDatasource
     * @param  { string } name Datasource name
     * @param  { string } schema New datasource schema following this notation https://docs.tinybird.co/api-reference/datasource-api.html#create-from-schema
     * @return { Promise<object> } Performed alter operations
     */
    alterDatasource: async (name, schema) => {
        try {
            const params = new URLSearchParams();
            params.append('schema', schema);

            const result = await fetch(`/v0/datasources/${name}/alter`, {
                method: 'POST',
                body: params
            });

            logger.debug(`Datasource altered: ${name}, new schema: ${schema}`);
            return result;
        } catch (error) {
            logger.error(`Error while altering datasource ${name} with schema: ${schema}`);
            logger.debug('Request: /v0/datasources/(.+)/alter');
            logger.debug(error);
        }
    },

    /**
     * Rename datasource
     * 
     * @function renameDatasource
     * @param  { string } name Datasource name
     * @param  { string } newName New datasource name
     * @return { Promise<object> } Datasource details
     */
    renameDatasource: async (name, newName) => {
        try {
            const params = new URLSearchParams();
            params.append('name', newName);

            const result = await fetch(`/v0/datasources/${name}`, {
                method: 'PUT',
                body: params
            });

            logger.debug(`Datasource ${name} renamed to ${newName}`);
            return result;
        } catch (error) {
            logger.error(`Error while renaming datasource ${name} to ${newName}`);
            logger.debug('Request: /v0/datasources/(.+)');
            logger.debug(error);
        }
    },

    /**
     * Drop (delete) datasource by name
     * 
     * @function dropDatasource
     * @param  { string } name Datasource name
     * @return { Promise<boolean> } Result as boolean
     */
    dropDatasource: async name => {
        try {
            await fetch(`/v0/datasources/${name}`, {
                method: 'DELETE'
            });
            logger.debug(`Datasource deleted: ${name}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting ${name}`);
            logger.debug(`Request: /v0/datasources/${name}`);
            logger.debug(error);
        }
    },

    /**
     * Append row to existing datasource
     * 
     * @function appendRows
     * @param  { string } name Datasource name
     * @param  { object } rows Rows to append
     * @param  { string } [format=csv] Datasource format, one of: json, csv, ndjson, parquet.
     * @return { Promise<boolean> } Result as boolean
     */
    appendRows: async (name, rows, format='csv') => {
        try {
            let formattedRows;
            switch(format) {
                case 'csv':
                    formattedRows = await rowsToCSV(rows);
                    break;
                case 'ndjson':
                    formattedRows = rowsToNDJSON(rows);
                    break;
                case 'json':
                    formattedRows = JSON.stringify(rows);
                    break;
            }

            // Add delimiter when format is csv
            if (format === 'csv') {
                format += '&dialect_delimiter=,';
            }

            const result = await fetch(`/v0/datasources?name=${name}&format=${format}&mode=append`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/csv;charset=utf-8',
                },
                body: formattedRows
            });

            logger.debug(`Rows appended to ${name}: ${rows.length}`);
            return result['error'] === false;
        } catch (error) {
            logger.error(`Error while appending rows to datasource ${name}`);
            logger.debug('Request: /v0/datasources/(.+)');
            logger.debug(error);
        }
    },


    /**
     * Replace datasource with these rows, deleting everything else as an idempotent operation
     * 
     * @function replaceWithRows
     * @param  { string } name Datasource name
     * @param  { object } rows Rows to replace with
     * @return { Promise<boolean> } Result as boolean
     */
    replaceWithRows: () => {
        // TODO: implement
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },

    /**
     * Append data file to existing datasource
     * 
     * @function appendFile
     * @param  { string } name Datasource name
     * @param  { object } filePath Path to file
     * @return { Promise<boolean> } Result as boolean
     */
    appendFile: async (name, filePath) => {
        try {
            const form = new FormData();
            const stats = fs.statSync(filePath);
            const fileSizeInBytes = stats.size;
            const fileStream = fs.createReadStream(filePath);
            const format = filePath.split('.')[filePath.split('.').length-1];
            form.append(format, fileStream, { knownLength: fileSizeInBytes });

            const result = await fetch(`/v0/datasources?name=${name}&format=${format}&mode=append&dialect_delimiter=,`, {
                method: 'POST',
                body: form
            });

            logger.debug(`Rows appended to ${name} from file ${filePath}`);
            return result['error'] === false;
        } catch (error) {
            logger.error(`Error while appending file ${filePath} to datasource ${name}`);
            logger.debug('Request: /v0/datasources/(.+)');
            logger.debug(error);
        }
    },

    /**
     * Replace datasource with file content, deleting everything else as an idempotent operation
     * 
     * @function replaceWithFile
     * @param  { string } name Datasource name
     * @param  { object } filePath Path to file
     * @return { Promise<boolean> } Result as boolean
     */
    replaceWithFile: () => {
        // TODO: implement
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    
    /**
     * Delete specific rows from datasource usign a filter condition
     * 
     * @function deleteRows
     * @param  { string } name Datasource name
     * @param  { string } condition Filter condition
     * @return { Promise<boolean> } Result as boolean
     */
    deleteRows: async (name, condition) => {
        try {
            const params = new URLSearchParams();
            params.append('delete_condition', `(${condition})`);

            await fetch(`/v0/datasources/${name}/delete`, {
                method: 'POST',
                body: params
            });

            logger.debug(`Deleted rows from datasource ${name}`);
            return true;
        } catch (error) {
            logger.error(`Error while deleting rows from datasource ${name}`);
            logger.debug(`Request: /v0/datasources/${name}/delete`);
            logger.debug(error);
        }
    },

    /**
     * Truncate datasource by name
     * 
     * @function truncateDatasource
     * @param  { string } name Datasource name
     * @return { Promise<boolean> } Result as boolean
     */
    truncateDatasource: async name => {
        try {
            await fetch(`/v0/datasources/${name}/truncate`, {
                method: 'POST'
            });
            logger.debug(`Datasource truncated: ${name}`);
            return true;
        } catch (error) {
            logger.error(`Error while truncating ${name}`);
            logger.debug(`Request: /v0/datasources/${name}/truncate`);
            logger.debug(error);
        }
    },

    /**
     * Send events to Events API
     * https://www.tinybird.co/docs/api-reference/events-api.html
     * 
     * Works for both:
     *   - Multiple JSON objects in an array [ {} , {} ]
     *   - Or a single object {}
     * 
     * @function sendEvent
     * @param  { string } name Datasource name
     * @param  { object } events JSON events. In array or single objects.
     * @param  { boolean } wait Wait until the write is acknowledged by the database.
     * @return { Promise<{ successful_rows: number, quarantined_rows: number }> } Operation result
     */
    sendEvents: async (name, events, wait = false) => {
        try {
            let formattedRows;
            switch(typeof events) {
                case 'object':
                    formattedRows = rowsToNDJSON(events);
                    break;
                default:
                    formattedRows = events.toString();
                    break;
            }

            let result = await fetch(`/v0/events?name=${name}&wait=${wait}`, {
                method: 'POST',
                body: formattedRows
            });
            result = JSON.parse(result);

            if (!result['error'] || result['error'] === false) {
                logger.debug(`Events (${Array.isArray(events) ? events.length : 1}) appended to ${name}`);
                return {
                    successful_rows: result['successful_rows'],
                    quarantined_rows: result['quarantined_rows']
                };
            } else {
                throw new Error(result['error'] || Exceptions.ERROR_APPENDING_EVENTS);
            }
        } catch (error) {
            logger.error(`Error while appending events to ${name}`);
            logger.debug(`Request: /v0/events?name=${name}&wait=${wait}`);
            logger.debug('Events: formattedRows');
            logger.debug(error);
        }
    }
};
