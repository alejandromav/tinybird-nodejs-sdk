---
layout: default
title: Quickstart
nav_order: 3
---

# Quickstart

First of all, login to [https://schemadb.com](https://schemadb.com) and head to API Tokens page. you can create a new one over there.

You can see more details about [authentication here](./authentication.markdown).

## Initialize
```js
const schemadb = require('@schemadb/sdk');
schemadb.init('1036fae0-3a28-11ea-a5e3-...');

// You can also pass some options
schemadb.init('1036fae0-3a28-11ea-a5e3-...', {
    debug: true
});
```

Available options are:

| Option | Description | Type | Default value |
| ------ | ----------- | ---- | ------------- |
| `debug` | Enables debug logging | `Boolean` | `false` |

## Save a new schema

```js
const orderSchema = {
	"version": 1,
	"definition": {
		"type": "record",
		"namespace": "com.example.store",
		"name": "order",
		"fields": [
          { "name": "orderId", "type": "long" },
          { "name": "storeId", "type": "long" },
          {
          	"name": "timeplaced",
           	"type": "long",
          	"logicalType": "timestamp-millis" 
          },
          { "name": "orderStatus", "type": "string" }
        ]
	}
};

// Save schema to platform
await schemadb.saveSchema(orderSchema);
```

## Encode payload

Schemas will be fetched only once from after instantiated, since the SDK handles caching for you.

```js
// Get latest schema by namespace and name
const schema = await schemadb.getSchema('com.example.store', 'order');

// Encode payload
const avro = await schemadb.encode(schema, {
    orderId: 1234567890,
    storeId: 1234,
    timeplaced: 1586193018930,
    orderStatus: 'A'
});
```

## Decode binary Avro

```js
// Decode binary buffer to JSON object
const { payload } = await schemadb.decode(avroBinaryBuffer);
```