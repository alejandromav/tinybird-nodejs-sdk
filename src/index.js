import Exceptions from './lib/exceptions';
import { validateAPIToken } from './lib/utils';
import { setConfiguration, Settings } from './stores/configuration';
import DatasourcesModule from './modules/datasources';
import QueryModule from './modules/query';

module.exports = {
    /**
     * Initialize SchemaDB SDK.
     * 
     * @param {string} apiToken SchemaDB API Token
     * @param {object} options SDK options
     */
    init: (apiToken, options = {}) => {
        if (validateAPIToken(apiToken)) {
            setConfiguration(Settings.API_TOKEN, apiToken);
        } else {
            throw new Error(Exceptions.INVALID_API_TOKEN);
        }

        setConfiguration(Settings.DEBUG, !!options[Settings.DEBUG]);
    },

    ...QueryModule,
    ...DatasourcesModule
};
