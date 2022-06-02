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
const tb = require('tinybird-sdk');
tb.init('p.eyJ1IjogIjZhNTdkYzFlCTM2ZTItNDNlYy04ZWRi...');

// You can also pass some options
tb.init('p.eyJ1IjogIjZhNTdkYzFlCTM2ZTItNDNlYy04ZWRi...', {
    debug: true
});
```
