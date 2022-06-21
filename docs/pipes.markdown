---
layout: default
title: Pipes
nav_order: 4
---

# Pipes

Query existing Pipes with this method:

```js
// Initialize sdk
import tb from 'tinybird-sdk';
tb.init('p.eyJ1IjogIjZhNTdkYzFlCTM2ZTItNDNlYy04ZWRi...');

// Query pipe
const { meta, rows, statistics } = await tb.queryPipe(pipeName);

// Query pipe with parameters
const { meta, rows, statistics } = await tb.queryPipe(pipeName, {
    age: 50
});
```
