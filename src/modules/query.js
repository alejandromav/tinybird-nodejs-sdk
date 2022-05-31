import Exceptions from '../lib/exceptions';

module.exports = {
    query: () => {
        throw new Error(Exceptions.METHOD_NOT_IMPLEMENTED);
    }
};
