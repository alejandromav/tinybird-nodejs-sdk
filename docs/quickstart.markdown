---
layout: default
title: Quickstart
nav_order: 3
---

# Quickstart

First of all, login to [https://tinybird.co](https://tinybird.co) and head to API Tokens page. you can create a new one over there.

You can see more details about [authentication here](./authentication.markdown).

## Initialize
```js
const tb = require('@alejandromav/tinybird-nodejs-sdk');
tb.init('1036fae0-3a28-11ea-a5e3-...');

// You can also pass some options
tb.init('1036fae0-3a28-11ea-a5e3-...', {
    debug: true
});
```
