# Tinybird Node.js SDK
![](https://github.com/alejandromav/tinybird-nodejs-sdk/workflows/CI/badge.svg)

## Usage

This library is documented in: [https://alejandromav.github.io/tinybird-nodejs-sdk](https://alejandromav.github.io/tinybird-nodejs-sdk)

First install the NPM package:

```bash
npm i tinybird-sdk
```

And then you can use the SDK:

```js
// Initialize sdk with your token
const tb = require('tinybird-sdk');
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
