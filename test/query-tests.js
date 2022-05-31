import { expect } from 'chai';
import tb from '../src';
import Exceptions from '../src/lib/exceptions';

describe('Test Query API', () => {
    const sampleToken = 'p.eyJ1IjogIjk0MzI5ODI0LTMwNjktNGU5Ny05NDFmLTExN2FkM2FlMjI4MiIsICJpZCI6ICJkMTY0NjBmYy05NjBjLTQ1NGMtODcwYy1mNzk2ZTNhMjk4MzEifQ.rJqT6F2ftJ_qhO6DH6z1lyNZVITeWu4YPguXI2k6SbB';

    it('should fail always beacuse method is not implemented yet', () => {
        tb.init(sampleToken);
        expect(() => tb.query())
            .to.throw(Error, Exceptions.METHOD_NOT_IMPLEMENTED);
    });
});
