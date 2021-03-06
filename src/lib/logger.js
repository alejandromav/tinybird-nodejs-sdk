import log4js from 'log4js';
import { Settings, getConfiguration } from '../stores/configuration';

export const getLogger = identifier => { 
    const logger = log4js.getLogger(`tinybird-sdk:${identifier}`);
    logger.level = 'off';
    
    logger._debug = logger.debug;
    logger.debug = function (message, ...args) {
        if (getConfiguration(Settings.DEBUG)) {
            logger.level = 'debug';
            logger._debug(message, ...args);
        }
    };

    return logger;
};
