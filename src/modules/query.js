import { getLogger } from '../lib/logger';
const logger = getLogger('query-module');
import { fetch } from '../lib/http';
import { sanitizeSQL, isValidSQLQuery } from '../lib/utils';
import Exceptions from '../lib/exceptions';

module.exports = {
    /**
     * Execute SQL query
     * 
     * @param  { String } sql SQL Query
     * @return { Object } resultset rows
     */
    query: async sql => {
        try {
            if (!isValidSQLQuery(sql)) {
                throw new Error(Exceptions.INVALID_SQL_QUERY);
            }

            return fetch(`/v0/sql?q=${sanitizeSQL(sql)}`);
        } catch (error) {
            logger.error('Error while fetching /v0/sql');
            logger.debug(`Request: /v0/sql?q=${sanitizeSQL(sql)}`);
            logger.debug(`Query: ${sql}`);
            logger.debug(error);
        }
    }
};
