import { fetch } from '../lib/http';
import { getLogger } from '../lib/logger';
const logger = getLogger('pipes-module');

/**
 * @module tinybird-sdk/pipes
 */
export default {
    /**
     * Query Pipe with optional parameters
     * 
     * @param  { string } pipeName Pipe name
     * @param  { object } [params={}] Parameters
     * @param  { string } [format=json] Result format. One of: json, csv, ndjson, parquet.
     * @return { Promise<object> } Resultset rows
     */
    queryPipe: async (pipeName, params={}, format='json') => {
        let queryString = '';
        try {
            Object.keys(params).map(k => {
                queryString += `${k}=${encodeURIComponent(params[k])}&`;
            }); 

            return fetch(`/v0/pipes/${pipeName}.${format}?${queryString}`);
        } catch (error) {
            logger.error('Error while querying pipe /v0/pipes/(.+).(json|csv|ndjson|parquet)');
            logger.debug(`Request: /v0/pipes/${pipeName}.${format}?${queryString}`);
            logger.debug(`Querystring: ${queryString}`);
            logger.debug(error);
        }
    }
};
