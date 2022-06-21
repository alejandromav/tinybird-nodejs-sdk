---
layout: default
title: Query
nav_order: 5
---

# Query

Just run a SQL query using this method:

```js
// Initialize sdk
import tb from 'tinybird-sdk';
tb.init('p.eyJ1IjogIjZhNTdkYzFlCTM2ZTItNDNlYy04ZWRi...');

// Execute SQL query
const { meta, rows, statistics } = await tb.query('select * from test_datasource');
```
