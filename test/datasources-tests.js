import { expect } from 'chai';
import tb from '../src';
import Exceptions from '../src/lib/exceptions';
import { randomUUID } from 'crypto';

describe('Test Query API', () => {
    const sampleToken = process.env.TEST_API_TOKEN;
    const datasourceName = 'test_' + randomUUID().split('-').join('_');
    tb.init(sampleToken);

    it('should create a new valid datasource', async () => {
        try {
            const result = await tb.createDatasource(
                datasourceName,
                'ts DateTime'
            );

            expect(result['datasource']['name']).to.equals(datasourceName);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should update datasource schema', async () => {
        try {
            const result = await tb.alterDatasource(
                datasourceName,
                'ts DateTime, foo String'
            );

            expect(result['operations']).deep.to.equals([ 'ADD COLUMN `foo` String' ]);
        } catch (error) {
            console.log(error);
            expect(error).to.be.null;
        }
    });

    it('should delete a valid datasource', async () => {
        try {
            await tb.dropDatasource(datasourceName);
        } catch (error) {
            expect(error).to.be.null;
        }

        // Check datasource doesn't exist anymore
        try {
            await tb.getDatasource(datasourceName);
        } catch (error) {
            expect(error.message).to.eq(Exceptions.NOT_FOUND);
        }
    });
});
