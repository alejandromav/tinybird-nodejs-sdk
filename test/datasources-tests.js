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
                'name String, profession String'
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
                'name String, profession String, age UInt16'
            );

            expect(result['operations']).deep.to.equals([ 'ADD COLUMN `age` UInt16' ]);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should rename datasource', async () => {
        try {
            const newName = `${datasourceName}_new`;

            // Rename to new name
            await tb.renameDatasource(datasourceName, newName);
            let renamedDatasource = await tb.getDatasource(newName);
            expect(renamedDatasource['name']).to.equals(newName);

            // Revert to old name
            await tb.renameDatasource(newName, datasourceName);
            renamedDatasource = await tb.getDatasource(datasourceName);
            expect(renamedDatasource['name']).to.equals(datasourceName);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should append new files to datasource', async () => {
        try {
            const rows = [
                { name: 'Han',    profession: 'Smuggler', age: 30 },
                { name: 'Luke',   profession: 'Hero',     age: 32 },
                { name: 'Leia',   profession: 'Princess', age: 32 },
                { name: 'Anakin', profession: 'Jedi',     age: 50 },
                { name: 'Obi',    profession: 'Jedi',     age: 65 },
                { name: 'Chewie', profession: 'Smuggler', age: 30 },
                { name: 'Lando',  profession: 'Smuggler', age: 50 }
            ];

            const result = await tb.appendRows(datasourceName, rows);

            expect(result).to.equals(true);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should delete specific rows from valid populated datasource', async () => {
        try {
            await tb.deleteRows(datasourceName, 'profession = \'Jedi\'');

            const result = await tb.query(`select * from ${datasourceName} where profession = 'Jedi'`);
            const characters = result['data'];

            expect(characters.length).to.eq(0);
        } catch (error) {
            console.log(error)
            expect(error).to.be.null;
        }
    });

    it('should truncate a valid datasource', async () => {
        try {
            await tb.truncateDatasource(datasourceName);

            const result = await tb.query(`select * from ${datasourceName}`);
            const characters = result['data'];

            expect(characters.length).to.eq(0);
        } catch (error) {
            console.log(error)
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
