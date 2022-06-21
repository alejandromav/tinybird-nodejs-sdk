import { getLogger } from '../lib/logger';
const logger = getLogger('datasources-module');
import { fetch } from '../lib/http';
import Exceptions from '../lib/exceptions';
import { rowsToCSV } from '../lib/utils';
import FormData from 'form-data';
const fs = require('fs');

module.exports = {
    /**
     * Get all datasources
     * 
     * @return { object } All datasources available
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
     * @param  { string } name Datasource name
     * @return { object } Datasource details
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
     * @param  { string } name Datasource name
     * @param  { string } schema Datasource schema following this notation https://docs.tinybird.co/api-reference/datasource-api.html#create-from-schema
     * @return { object } Datasource details
     */
    createDatasource: async (name, schema) => {
        try {
            const params = new URLSearchParams();
            params.append('name', name);
            params.append('schema', schema);

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
     * Alter existing datasource schema
     * 
     * @param  { string } name Datasource name
     * @param  { string } schema New datasource schema following this notation https://docs.tinybird.co/api-reference/datasource-api.html#create-from-schema
     * @return { object } Performed alter operations
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
     * @param  { string } name Datasource name
     * @param  { string } newName New datasource name
     * @return { object } Datasource details
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
     * @param  { string } name Datasource name
     * @return { boolean } Result as boolean
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
     * @param  { string } name Datasource name
     * @param  { object } rows Rows to append
     * @return { boolean } Result as boolean
     */
    appendRows: async (name, rows) => {
        try {
            const result = await fetch(`/v0/datasources?name=${name}&format=csv&mode=append&dialect_delimiter=,`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/csv;charset=utf-8',
                },
                body: await rowsToCSV(rows)
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
     * Append data file to existing datasource
     * 
     * @param  { string } name Datasource name
     * @param  { object } filePath Path to file
     * @return { boolean } Result as boolean
     */
    appendFile: async (name, filePath) => {
        try {
            const form = new FormData();
            const stats = fs.statSync(filePath);
            const fileSizeInBytes = stats.size;
            const fileStream = fs.createReadStream(filePath);
            form.append('csv', fileStream, { knownLength: fileSizeInBytes });

            const result = await fetch(`/v0/datasources?name=${name}&format=csv&mode=append&dialect_delimiter=,`, {
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
     * Delete specific rows from datasource usign a filter condition
     * 
     * @param  { string } name Datasource name
     * @param  { string } condition Filter condition
     * @return { boolean } Result as boolean
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
     * @param  { string } name Datasource name
     * @return { boolean } Result as boolean
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

    /* Experimental */
    sendEvents: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    }
};
