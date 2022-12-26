import { json2csvAsync } from 'json-2-csv';

export const validateAPIToken = apiToken => {
    return apiToken
        && typeof apiToken === 'string'
        && apiToken.length
        && apiToken.split('.').length === 3
        && apiToken.split('.')[0] === 'p';
};

export const rowsToNDJSON = rows => {
    // Support also single objects
    if (!Array.isArray(rows)) {
        rows = [ rows ];
    }

    return rows.map(JSON.stringify).join('\n');
};

export const rowsToCSV = rows => {
    return json2csvAsync(rows, { prependHeader: false });
};

export const isValidSQLQuery = sql => {
    return _formatSQL(sql).indexOf('select') === 0;
};

export const sanitizeSQL = sql => {
    return encodeURIComponent(`select * from (${_formatSQL(sql)}) format JSON`);
};

const _formatSQL = sql => sql.toLowerCase().trim();

export const formatRows = async (format, rows) => {
    let formattedRows;
    switch (format) {
        case 'csv':
            formattedRows = await rowsToCSV(rows);
            break;
        case 'ndjson':
            formattedRows = rowsToNDJSON(rows);
            break;
        case 'json':
            formattedRows = JSON.stringify(rows);
            break;
    }
    return formattedRows;
};
