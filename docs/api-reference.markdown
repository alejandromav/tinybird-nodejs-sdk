---
layout: default
title: API Reference
nav_order: 4
---

# API Reference

## Navigation Structure
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---------------

## `getSchema(namespace, name, version) => Promise<Object>`
{:toc}

Get latest schema version for a given namespace and name. It caches versions in memory, so it only fetches from the API the first time any schema is used.

If no version is specified, the latest one is returned.

#### Parameters
{: .no_toc }

| Name | Type | Description |
| ---- | ---- | ----------- |
| namespace | `string` | Schema's namespace |
| name | `string` | Schema's name |
| version | `string` | *(optional)* Schema's version |

#### Example
{: .no_toc }

```js
const schemadb = require('@schemadb/sdk');
schemadb.init('1036fae0-3a28-11ea-a5e3-...');

// The latest version is returned if no version is passed
const latestSchemaVersion = await schemadb.getSchema('com.example.store', 'order');

// Or just specify some
const schemaV2 = await schemadb.getSchema('com.example.store', 'order', '2');
```

---------------

## `saveSchema(schema) => Promise<Object>`
{:toc}

Save new Avro schema to platform. Will fail if version already exists.

#### Parameters
{: .no_toc }

| Name | Type | Description |
| ---- | ---- | ----------- |
| schema | `Object` | [Avro JSON valid type](https://avro.apache.org/docs/current/spec.html#schemas) |

#### Example
{: .no_toc }

```js
const schemadb = require('@schemadb/sdk');
schemadb.init('1036fae0-3a28-11ea-a5e3-...');

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

---------------

## `encode(schema, payload) => Buffer`
{:toc}

Encode `Object` to Avro binary [Buffer](https://nodejs.org/api/buffer.html).

#### Parameters
{: .no_toc }

| Name | Type | Description |
| ---- | ---- | ----------- |
| schema | `Object` | [Avro JSON valid type](https://avro.apache.org/docs/current/spec.html#schemas) |
| payload | `Object` | Object to be encoded |

#### Example
{: .no_toc }

```js
const schemadb = require('@schemadb/sdk');
schemadb.init('1036fae0-3a28-11ea-a5e3-...');

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
---------------

## `decode(binaryBuffer) => Promise<Object>`
{:toc}

Decode Avro binary [Buffer](https://nodejs.org/api/buffer.html) to `Object`. Returns both the payload and the schema.

#### Parameters
{: .no_toc }

| Name | Type | Description |
| ---- | ---- | ----------- |
| binaryBuffer | `Buffer` | Avro encoded binary buffer |

#### Example
{: .no_toc }

```js
const schemadb = require('@schemadb/sdk');
schemadb.init('1036fae0-3a28-11ea-a5e3-...');

// Decode binary buffer to JSON object
const { payload, schema } = await schemadb.decode(avroBinaryBuffer);
```
