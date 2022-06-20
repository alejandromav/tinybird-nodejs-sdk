---
layout: default
title: Quickstart
nav_order: 2
---

# Quickstart

First of all, login to [https://tinybird.co](https://tinybird.co) and head to API Tokens page. you can create a new one over there.

You can see more details about [authentication here](./authentication.markdown).

## Initialize
```js
// Initialize sdk
const tb = require('tinybird-sdk');
tb.init('p.eyJ1IjogIjZhNTdkYzFlCTM2ZTItNDNlYy04ZWRi...');

// Create datasource
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
```
