import Exceptions from './lib/exceptions';
import { setConfiguration, Settings } from './stores/configuration';

const _validateAPIToken = apiToken => {
    return apiToken
        && typeof apiToken === 'string'
        && apiToken.length
        && apiToken.split('.').length === 3
        && apiToken.split('.')[0] === 'p';
};

module.exports = {
    /**
     * Initialize SchemaDB SDK.
     * 
     * @param {string} apiToken SchemaDB API Token
     * @param {object} options SDK options
     */
    init: (apiToken, options = {}) => {
        if (_validateAPIToken(apiToken)) {
            setConfiguration(Settings.API_TOKEN, apiToken);
        } else {
            throw new Error(Exceptions.INVALID_API_TOKEN);
        }

        setConfiguration(Settings.DEBUG, !!options[Settings.DEBUG]);
    }
};
