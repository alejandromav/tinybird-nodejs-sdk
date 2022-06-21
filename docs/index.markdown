---
layout: home
title: Index
nav_order: 1
---

# Home

This is the Node.js SDK for [https://tinybird.co](https://tinybird.co).

**WARNING: this is still WIP.**

## Installation

```bash
npm i tinybird-sdk
```

## Usage

First of all, login to [https://tinybird.co](https://tinybird.co) and head to API Tokens page, you can create a new one over there.

You can see more details about [authentication here](./authentication.markdown).

And then you can use the SDK:

```js
// Initialize sdk
import tb from 'tinybird-sdk';
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
