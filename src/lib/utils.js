export const validateAPIToken = apiToken => {
    return apiToken
        && typeof apiToken === 'string'
        && apiToken.length
        && apiToken.split('.').length === 3
        && apiToken.split('.')[0] === 'p';
};

export const rowsToNDJSON = rows => {
    return rows.map(JSON.stringify).join('\n');
};
