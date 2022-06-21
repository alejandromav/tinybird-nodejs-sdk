import { expect } from 'chai';
import tb from '../src';
import Exceptions from '../src/lib/exceptions';

describe('Test Pipes API', () => {
    const sampleToken = process.env.TEST_API_TOKEN;
    const pipeName = 'test_pipe';

    before(done => {
        tb.init(sampleToken);
        done();
    });

    it('should work when querying a valid Pipe', async () => {
        try {
            const result = await tb.queryPipe(pipeName);
            expect(result['data'].length).to.equals(7);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should work when querying a valid Pipe with valid parameters', async () => {
        try {
            const result = await tb.queryPipe(pipeName, { age: 50 });
            expect(result['data'].length).to.equals(3);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should fail when querying a non-existing Pipe', async () => {
        try {
            await tb.queryPipe('non_existing_pipe');
        } catch (error) {
            expect(error.message).to.eq(Exceptions.NOT_FOUND);
        }
    });
});
