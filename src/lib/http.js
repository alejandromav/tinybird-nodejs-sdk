import f from 'node-fetch';
import { getConfiguration, Settings } from '../stores/configuration';
import Exceptions from './exceptions';
import { getLogger } from '../lib/logger';
const logger = getLogger('query-module');
import pjson from '../../package.json';

export const fetch = async (uri, options) => {
    const response = await f(`${getConfiguration(Settings.API_URL)}${uri}`, {
        headers: {
            'Authorization': `Bearer ${getConfiguration(Settings.API_TOKEN)}`,
            'Accept': 'application/json',
            'User-Agent': `tinybird-node-sdk@${pjson['version']}`
        },
        ...options
    });

    if (response.ok) {
        return response.json();
    } else if (response.status === 401) {
        throw new Error(Exceptions.INVALID_API_TOKEN);
    } else if (response.status === 403) {
        throw new Error(Exceptions.INSUFFICIENT_PERMISSIONS);
    } else {
        logger.debug(response);
        throw new Error(response.statusText);
    }
};
