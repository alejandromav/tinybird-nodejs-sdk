import { expect } from 'chai';
import tb from '../src';
import Exceptions from '../src/lib/exceptions';

describe('Test SDK initialization', () => {
    const sampleToken = process.env.TEST_API_TOKEN;

    it('should fail when no API token is passed', () => {
        expect(() => tb.init())
            .to.throw(Error, Exceptions.INVALID_API_TOKEN);
    });

    it('should fail when an invalid API token is passed', () => {
        expect(() => tb.init(''))
            .to.throw(Error, Exceptions.INVALID_API_TOKEN);

        expect(() => tb.init(1234))
            .to.throw(Error, Exceptions.INVALID_API_TOKEN);
    });

    it('should work when a valid API token is passed', () => {
        tb.init(sampleToken);
    });

    it('should work when a valid API token with options is passed', () => {
        tb.init(sampleToken, { 'debug': true });
    });
});
