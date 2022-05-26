import { expect } from 'chai';
import schemadb from '../src';
import Exceptions from '../src/lib/exceptions';

describe('Test SDK initialization', () => {
    it('should fail when no API token is passed', () => {
        expect(() => schemadb.init())
            .to.throw(Error, Exceptions.INVALID_API_TOKEN);
    });

    it('should fail when an invalid API token is passed', () => {
        expect(() => schemadb.init(''))
            .to.throw(Error, Exceptions.INVALID_API_TOKEN);

        expect(() => schemadb.init(1234))
            .to.throw(Error, Exceptions.INVALID_API_TOKEN);
    });

    it('should work when a valid API token is passed', () => {
        schemadb.init('aaa');
    });
    it('should work when a valid API token with options is passed', () => {
        schemadb.init('aaa', { 'debug': true });
    });
});
