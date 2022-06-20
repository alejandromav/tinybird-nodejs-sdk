---
layout: default
title: API Reference
nav_order: 6
---

# API Reference
{: .no_toc }

## Navigation Structure
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---------------

## Setup
{:toc}

### `init(token, options) => Undefined`
{:toc}

Initalize SDK with API token and other options.

#### Parameters
{: .no_toc }

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `String` | [Tinybird API token](https://docs.tinybird.co/main-concepts.html#auth-tokens-title) |
| options.debug | `Boolean` | flag for setting log level to debug |
| options.'api-url' | `String` | Custom tenant url. Defaults to https://api.tinybird.co |

#### Example
{: .no_toc }

```js
const tb = require('tinybird-sdk');

tb.init('p.eyJ1IjogIjZhNTdkYzFlCTM2ZTItNDNlYy04ZWRi...');

// You can also pass some options
tb.init('p.eyJ1IjogIjZhNTdkYzFlCTM2ZTItNDNlYy04ZWRi...', {
    debug: true
});

// If you have a custom installation
tb.init('p.eyJ1IjogIjZhNTdkYzFlCTM2ZTItNDNlYy04ZWRi...', {
    'api-url': 'https://my-tenant.tinybird.co'
});
```

---------------

## Query
{:toc}

### `query(sql) => Promise<Object>`
{:toc}

Query [API endpoint](https://docs.tinybird.co/api-reference/query-api.html#get--v0-sql-title) and get resulting rows.

#### Parameters
{: .no_toc }

| Name | Type | Description |
| ---- | ---- | ----------- |
| sql | `String` | SQL query, only `SELECT` is allowed. |

#### Example
{: .no_toc }

```js
const tb = require('tinybird-sdk');

tb.init('p.eyJ1IjogIjZhNTdkYzFlCTM2ZTItNDNlYy04ZWRi...');

const result = await tb.query('select 1');
console.table(result['data']);
```

---------------

## Datasources
{:toc}


---------------

## Pipes
{:toc}
