# Tinybird Node.js SDK
![](https://github.com/alejandromav/tinybird-nodejs-sdk/workflows/CI/badge.svg)

This library is documented in: [https://alejandromav.github.io/tinybird-nodejs-sdk](https://alejandromav.github.io/tinybird-nodejs-sdk)

## Install
```bash
npm i tinybird-sdk
```

Requires Node.js >= 10.10.0

## Usage

And then you can use the SDK:

```js
// Initialize sdk with your token
import tb from 'tinybird-sdk';
tb.init('p.eyJ1IjogIjZhNTdkYzFlCTM2ZTItNDNlYy04ZWRi...');

// Create a new datasource
await tb.createDatasource(
    'characters',
    'name String, profession String, age UInt16'
);

// Append some rows
await tb.appendRows('characters', [
    { name: 'Han',      profession: 'Smuggler', age: 30 },
    { name: 'Luke',     profession: 'Hero',     age: 32 },
    { name: 'Leia',     profession: 'Princess', age: 32 },
    { name: 'Anakin',   profession: 'Jedi',     age: 50 },
    { name: 'Obi-Wan',  profession: 'Jedi',     age: 65 },
    { name: 'Chewie',   profession: 'Smuggler', age: 30 },
    { name: 'Lando',    profession: 'Smuggler', age: 50 }
]);

// ...or append a file (local or remote)
const filePath = path.join(__dirname, './characters.csv');
await tb.appendFile(datasourceName, filePath);

// Query datasource
const result = await tb.query('select * from characters');
const characters = result['data'];

// Query pipe
const { meta, rows, statistics } = await tb.queryPipe(pipeName);

// Query pipe with parameters
const { meta, rows, statistics } = await tb.queryPipe(pipeName, {
    age: 50
});
```

## Development

```bash
# Fork and clone this repo
npm i

# You can keep track of tests status while making changes
npm run test:watch

# And make sure everythign is fine after changes
npm run lint
npm run test:coverage
```

### Contribute

[CONTRIBUTING.md](./CONTRIBUTING.md)

## Maintainers

Contact hi@alejandromav.com
