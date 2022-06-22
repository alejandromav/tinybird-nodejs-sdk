import Exceptions from './lib/exceptions';
import { validateAPIToken } from './lib/utils';
import { setConfiguration, Settings } from './stores/configuration';
import DatasourcesModule from './modules/datasources';
import QueryModule from './modules/query';
import PipesModule from './modules/pipes';

/**
 * @module tinybird-sdk
 */
export default {
    /**
     * Initialize Tinybird SDK.
     * 
     * @function init
     * @param { string } apiToken Tinybird API Token
     * @param { object } [options] SDK options
     * @param { boolean } [options.debug=false] Flag for debug logging
     * @param { string } [options.apiUrl='https://api.tinybird.co'] Base url for custom installations
     */
    init: (apiToken, options = {}) => {
        if (validateAPIToken(apiToken)) {
            setConfiguration(Settings.API_TOKEN, apiToken);
        } else {
            throw new Error(Exceptions.INVALID_API_TOKEN);
        }

        // Support custom tenants
        if (validateAPIToken(options[Settings.API_URL])) {
            setConfiguration(Settings.API_URL, options[Settings.API_URL]);
        }

        setConfiguration(Settings.DEBUG, !!options[Settings.DEBUG]);
    },

    ...QueryModule,
    ...DatasourcesModule,
    ...PipesModule
};
