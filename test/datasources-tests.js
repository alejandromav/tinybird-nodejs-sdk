import { expect } from 'chai';
import tb from '../src';
import Exceptions from '../src/lib/exceptions';
import { randomUUID } from 'crypto';
import path from 'path';

describe('Test Datasources API', () => {
    const sampleToken = process.env.TEST_API_TOKEN;
    const datasourceName = 'test_' + randomUUID().split('-').join('_');

    before(done => {
        tb.init(sampleToken);
        done();
    });

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

    it('should create a new valid NDJSON datasource', async () => {
        try {
            // Create datasource
            const newName = `${datasourceName}_ndjson`;
            let result = await tb.createDatasource(
                newName,
                'name String `json:$.name`, profession String `json:$.profession`, age UInt16 `json:$.age`'
            );
            expect(result['datasource']['name']).to.equals(newName);

            // Append some rows
            const rows = [
                { name: 'Han',    profession: 'Smuggler', age: 30 },
                { name: 'Luke',   profession: 'Hero',     age: 32 },
                { name: 'Leia',   profession: 'Princess', age: 32 },
                { name: 'Anakin', profession: 'Jedi',     age: 50 },
                { name: 'Obi',    profession: 'Jedi',     age: 65 }
            ];
            result = await tb.appendRows(newName, rows, 'ndjson');
            expect(result).to.equals(true);

            // Append sample ndjson file
            const filePath = path.join(__dirname, './fixtures/characters.ndjson')
            // Avoid API throttling (429)
            await new Promise(resolve => setTimeout(resolve, 30000));
            result = await tb.appendFile(newName, filePath);
            expect(result).to.equals(true);

            // Drop datasource and check doesn't exist anymore
            await tb.dropDatasource(newName);
            try {
                await tb.getDatasource(newName);
            } catch (error) {
                expect(error.message).to.eq(Exceptions.NOT_FOUND);
            }
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

    it('should append new rows to datasource', async () => {
        try {
            const rows = [
                { name: 'Han',    profession: 'Smuggler', age: 30 },
                { name: 'Luke',   profession: 'Hero',     age: 32 },
                { name: 'Leia',   profession: 'Princess', age: 32 },
                { name: 'Anakin', profession: 'Jedi',     age: 50 },
                { name: 'Obi',    profession: 'Jedi',     age: 65 }
            ];

            const result = await tb.appendRows(datasourceName, rows);

            expect(result).to.equals(true);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should append new rows from file to datasource', async () => {
        try {
            const filePath = path.join(__dirname, './fixtures/characters.csv')
            const result = await tb.appendFile(datasourceName, filePath);

            expect(result).to.equals(true);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should append a large file to datasource', async () => {
        try {
            // Create datasource
            const newName = `${datasourceName}_large`;
            await tb.createDatasource(
                datasourceName,
                'symbol String, date Date, open Float32, high Float32, low Float32, close Float32, close_adjusted Float32, volume Int64, split_coefficient Float32'
            );

            // Append large csv file
            const filePath = path.join(__dirname, './fixtures/stock_prices_1M.csv')
            
            // Avoid API throttling (429)
            await new Promise(resolve => setTimeout(resolve, 30000));

            const result = await tb.appendFile(newName, filePath);
            expect(result).to.equals(true);

            // Drop datasource and check doesn't exist anymore
            await tb.dropDatasource(newName);
            try {
                await tb.getDatasource(newName);
            } catch (error) {
                expect(error.message).to.eq(Exceptions.NOT_FOUND);
            }
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
            expect(error).to.be.null;
        }
    });

    it('should replace datasource with rows', async () => {
        try {
            const rows = [
                { name: 'Leia',   profession: 'Princess', age: 32 },
                { name: 'Anakin', profession: 'Jedi',     age: 50 },
                { name: 'Obi',    profession: 'Jedi',     age: 65 }
            ];

            // Avoid API throttling (429)
            await new Promise(resolve => setTimeout(resolve, 30000));
            await tb.replaceWithRows(datasourceName, rows);

            const result = await tb.query(`select * from ${datasourceName}`);
            const characters = result['data'];

            expect(characters.length).to.eq(3);
        } catch (error) {
            expect(error).to.be.null;
        }
    });

    it('should replace datasource with rows matching a condition', async () => {
        try {
            const rows = [
                { name: 'Mace Windu', profession: 'Jedi', age: 50 }
            ];

            // Avoid API throttling (429)
            await new Promise(resolve => setTimeout(resolve, 30000));
            await tb.replaceWithRows(datasourceName, rows, 'csv', 'profession = \'Jedi\'');

            const result = await tb.query(`select * from ${datasourceName} where profession = 'Jedi'`);
            const characters = result['data'];

            expect(characters.length).to.eq(1);
            expect(characters[0]['name']).to.eq('Mace Windu');
        } catch (error) {
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
