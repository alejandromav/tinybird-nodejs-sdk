import f from 'node-fetch';
import { getConfiguration, Settings } from '../stores/configuration';
import Exceptions from './exceptions';
import { getLogger } from '../lib/logger';
const logger = getLogger('query-module');
import pjson from '../../package.json';

export const fetch = async (uri, options = {}) => {
    const response = await f(`${getConfiguration(Settings.API_URL)}${uri}`, {
        headers: {
            'Authorization': `Bearer ${getConfiguration(Settings.API_TOKEN)}`,
            'Accept': 'application/json',
            'User-Agent': `tinybird-node-sdk@${pjson['version']}`
        },
        ...options
    });

    if (response.ok) {
        logger.debug(`[${response.status}] ${options['method'] || 'GET'} ${getConfiguration(Settings.API_URL)}${uri}`);
        const responseIsJSON =
            response.headers.raw()['content-type']
            && response.headers.raw()['content-type'][0] === 'application/json; charset=UTF-8';

        return responseIsJSON ? response.json() : response.text();
    } else {
        logger.error(`[${response.status}] ${options['method'] || 'GET'} ${getConfiguration(Settings.API_URL)}${uri}`);
        logger.debug(response);

        if (response.status === 400) {
            throw new Error(Exceptions.BAD_REQUEST);
        } else if (response.status === 401) {
            throw new Error(Exceptions.INVALID_API_TOKEN);
        } else if (response.status === 403) {
            throw new Error(Exceptions.INSUFFICIENT_PERMISSIONS);
        } else if (response.status === 404) {
            throw new Error(Exceptions.NOT_FOUND);
        }

        throw new Error(response.statusText);
    }
};
