import { expect } from 'chai';
import schemadb from '../src';
import Exceptions from '../src/lib/exceptions';

describe('Test SDK initialization', () => {
    const sampleToken = 'p.eyJ1IjogIjk0MzI5ODI0LTMwNjktNGU5Ny05NDFmLTExN2FkM2FlMjI4MiIsICJpZCI6ICJkMTY0NjBmYy05NjBjLTQ1NGMtODcwYy1mNzk2ZTNhMjk4MzEifQ.rJqT6F2ftJ_qhO6DH6z1lyNZVITeWu4YPguXI2k6SbB';

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
        schemadb.init(sampleToken);
    });

    it('should work when a valid API token with options is passed', () => {
        schemadb.init(sampleToken, { 'debug': true });
    });
});
