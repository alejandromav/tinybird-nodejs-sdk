import { expect } from 'chai';
import tb from '../src';
import Exceptions from '../src/lib/exceptions';

describe('Test Query API', () => {
    const sampleToken = process.env.TEST_API_TOKEN;

    it('should work when a valid SQL query is passed', async () => {
        try {
            tb.init(sampleToken);
            const result = await tb.query('select 1');
            expect(result['data'][0]['1']).to.equals(1);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should fail when invalid SQL query is passed', async () => {
        try {
            tb.init(sampleToken);
            await tb.query('drop database')
        } catch (error) {
            expect(error.message).to.eq(Exceptions.INVALID_SQL_QUERY);
        }
    });
});
