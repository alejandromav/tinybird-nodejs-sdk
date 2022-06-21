const _configuration = {
    'apiUrl': 'https://api.tinybird.co'
};

export const Settings = Object.freeze({
    DEBUG: 'debug',
    API_URL: 'apiUrl',
    API_TOKEN: 'apiToken'
});

export const setConfiguration = (configKey, configValue) => {
    _configuration[configKey] = configValue;
    return;
};

export const getConfiguration = configKey => {
    const configValue = _configuration[configKey];
    return configValue;
};
