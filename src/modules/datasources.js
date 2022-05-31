import Exceptions from '../lib/exceptions';

module.exports = {
    getDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    createDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    alterDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    renameDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    truncateDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    dropDatasource: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    appendRows: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    deleteRows: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    },
    sendEvents: () => {
        /* Experimental */
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    }
};
