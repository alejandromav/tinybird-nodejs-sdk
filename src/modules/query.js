import { getLogger } from '../lib/logger';
const logger = getLogger('query-module');
import { fetch } from '../lib/http';
import { sanitizeSQL } from '../lib/utils';

module.exports = {
    /**
     * Execute SQL query
     * 
     * @param {string} sql SQL Query
     */
    query: async sql => {
        try {
            return fetch(`/v0/sql?q=${sanitizeSQL(sql)}`);
        } catch (error) {
            logger.error('Error while fetching /v0/sql');
            logger.debug(`Query: ${sanitizeSQL}`);
            logger.debug(error);
        }
    }
};
