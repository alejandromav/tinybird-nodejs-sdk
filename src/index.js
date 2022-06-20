import Exceptions from './lib/exceptions';
import { validateAPIToken } from './lib/utils';
import { setConfiguration, Settings } from './stores/configuration';
import DatasourcesModule from './modules/datasources';
import QueryModule from './modules/query';

module.exports = {
    /**
     * Initialize Tinybird SDK.
     * 
     * @param { String } apiToken Tinybird API Token
     * @param { Object } options SDK options
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
    ...DatasourcesModule
};
