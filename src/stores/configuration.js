const _configuration = {
    'api-url': 'https://api.tinybird.co/'
};

export const Settings = Object.freeze({
    DEBUG: 'debug',
    API_URL: 'api-url',
    API_TOKEN: 'api-token'
});

export const setConfiguration = (configKey, configValue) => {
    _configuration[configKey] = configValue;
    return;
};

export const getConfiguration = configKey => {
    const configValue = _configuration[configKey];
    return configValue;
};
