import { getLogger } from '../lib/logger';
const logger = getLogger('datasources-module');
import { fetch } from '../lib/http';
import Exceptions from '../lib/exceptions';

module.exports = {
    /**
     * Get all datasources
     * 
     * @return { Object } All datasources available
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
     * @param  { String } name Datasource name
     * @return { Object } Datasource details
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
     * @param  { String } name Datasource name
     * @param  { String } schema Datasource schema following this notation https://docs.tinybird.co/api-reference/datasource-api.html#create-from-schema
     * @return { Object } Datasource details
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
            logger.error(`Error while creating datarource ${name}`);
            logger.debug('Request: /v0/datasources/');
            logger.debug(error);
        }
    },

    /**
     * Alter existing datasource schema
     * 
     * @param  { String } name Datasource name
     * @param  { String } schema New datasource schema following this notation https://docs.tinybird.co/api-reference/datasource-api.html#create-from-schema
     * @return { Object } Datasource details
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
            logger.error(`Error while altering datarource ${name} with schema: ${schema}`);
            logger.debug('Request: /v0/datasources/(.+)/alter');
            logger.debug(error);
        }
    },
    renameDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    truncateDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },

    /**
     * Drop (delete) datasource by name
     * 
     * @param  { String } name Datasource name
     * @return { Undefined }
     */
    dropDatasource: async name => {
        try {
            const result = await fetch(`/v0/datasources/${name}`, {
                method: 'DELETE'
            });
            logger.debug(`Datasource deleted: ${name}`);
            return result;
        } catch (error) {
            logger.error(`Error while deleting ${name}`);
            logger.debug(`Request: /v0/datasources/${name}`);
            logger.debug(error);
        }
    },
    appendRows: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    appendFile: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    deleteRows: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    /* Experimental */
    sendEvents: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    }
};
