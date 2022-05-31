import { expect } from 'chai';
import tb from '../src';
import Exceptions from '../src/lib/exceptions';

describe('Test Query API', () => {
    const sampleToken = process.env.TEST_API_TOKEN;

    it('should work when a valid SQL query is passed', async () => {
        tb.init(sampleToken);
        const result = await tb.query('select 1');
        expect(result).to.equals(1);
    });
});
