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

export const isValidSQLQuery = sql => {
    return sanitizeSQL(sql).indexOf('select') === 0;
};

export const sanitizeSQL = sql => {
    return encodeURIComponent(`select * from (${sql.toLowerCase().trim()}) format JSON`);
};
