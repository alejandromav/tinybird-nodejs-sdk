import { getLogger } from '../lib/logger';
const logger = getLogger('datasources-module');
import { fetch } from '../lib/http';
import Exceptions from '../lib/exceptions';

module.exports = {
    getAllDatasources: () => {
        try {
            return fetch('/v0/datasources');
        } catch (error) {
            logger.error('Error while fetching /v0/datasources');
            logger.debug('Request: /v0/datasources/');
            logger.debug(error);
        }
    },
    getDatasource: name => {
        try {
            return fetch(`/v0/datasources/${name}`);
        } catch (error) {
            logger.error('Error while fetching /v0/datasources');
            logger.debug(`Request: /v0/datasources/${name}`);
            logger.debug(error);
        }
    },
    createDatasource: (name, schema) => {
        try {
            const params = new URLSearchParams();
            params.append('name', name);
            params.append('schema', schema);

            return fetch('/v0/datasources', {
                method: 'POST',
                body: params
            });
        } catch (error) {
            logger.error('Error while fetching /v0/datasources');
            logger.debug('Request: /v0/datasources/');
            logger.debug(error);
        }
    },
    alterDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    renameDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    truncateDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    dropDatasource: name => {
        try {
            return fetch(`/v0/datasources/${name}`, {
                method: 'DELETE'
            });
        } catch (error) {
            logger.error('Error while fetching /v0/datasources');
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
