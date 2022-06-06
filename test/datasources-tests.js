import { expect } from 'chai';
import tb from '../src';
import Exceptions from '../src/lib/exceptions';
import { randomUUID } from 'crypto';

describe('Test Query API', () => {
    const sampleToken = process.env.TEST_API_TOKEN;
    const datasetName = 'test_' + randomUUID().split('-').join('_');
    tb.init(sampleToken);

    it('should create a new valid datasource', async () => {
        try {
            const result = await tb.createDatasource(
                datasetName,
                'ts DateTime'
            );

            expect(result['datasource']['name']).to.equals(datasetName);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should delete a valid datasource', async () => {
        try {
            await tb.dropDatasource(datasetName);
        } catch (error) {
            expect(error).to.be.null;
        }

        // Check dataset doesn't exist anymore
        try {
            await tb.getDatasource(datasetName);
        } catch (error) {
            expect(error.message).to.eq(Exceptions.NOT_FOUND);
        }
    });
});
