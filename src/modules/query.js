import { getLogger } from '../lib/logger';
const logger = getLogger('query-module');
import { fetch } from '../lib/http';
import { sanitizeSQL, isValidSQLQuery } from '../lib/utils';
import Exceptions from '../lib/exceptions';

/**
 * @module tinybird-sdk/query
 */
export default {
    /**
     * Execute SQL query
     * 
     * @function query
     * @param  { string } sql SQL Query
     * @return { Promise<object> } Resultset rows
     */
    query: async sql => {
        try {
            if (!isValidSQLQuery(sql)) {
                throw new Error(Exceptions.INVALID_SQL_QUERY);
            }

            return await fetch(`/v0/sql?q=${sanitizeSQL(sql)}`);
        } catch (error) {
            logger.error('Error while fetching /v0/sql');
            logger.debug(`Request: /v0/sql?q=${sanitizeSQL(sql)}`);
            logger.debug(`Query: ${sql}`);
            logger.debug(error);
        }
    }
};
