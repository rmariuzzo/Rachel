<div align=center>
  <h1>Rachel</h1>
  <small>
    <strong>R</strong>ESTful
    <strong>A</strong>PI 
    <strong>C</strong>lient
    <strong>hel</strong>per
  </small>
  <p>🚀 Quickly create a RESTful client!<p>
</div>

## Install

 - **NPM**: `npm install rachel --save`
 - **Yarn**: `yarn add rachel`

 **Dependency:** **Rachel** is built on top of `fetch` you will need to [install it](https://github.com/matthew-andrews/isomorphic-fetch).

## Features

 - **Under 4KB** (1.12KB gziped).
 - 2 almost-dependency: `fetch` and `Promise`.
 - **Builds:** CommonJS, ES and UMD.

## Example

```js
// api.js
import rachel from 'rachel'

const api = rachel.createApi(options)

export default {
  users: {
    list: api.list('/users'),
    get: api.get('/users/:id'),
    post: api.post('/users'),
    put: api.put('/users/:id'),
    del: api.del('/users/:id'),
  }
}
```

```js
// main.js
import api from './api'

api.users.list()         // GET:    /users
api.users.get(123)       // GET:    /users/123
api.users.post(user)     // POST:   /users     { "name": "foo" }
api.users.put(123, user) // PUT:    /users/123 { "name": "bar" }
api.users.del(123)       // DELETE: /users/123
```

## Documentation

### `createApi`

Create an API wrapper with options.

```js
rachel.createApi(options)
```

 - `options` - `Object`. _Optional_. [Request options](#request-options) that will be transfered to all methods (`list`, `get`, `post`, `put` and `del`).
   - `prefix` - `String`. The prefix to add to all API requests.

## `list`

Prepare a `GET` request function that will list all items of a resource.

```js
rachel.list(path, options)
```

 - `path` - `String`. **Required**. [URI path pattern](#uri-path-pattern).
 - `options` - `Object`. _Optional_. [Request options](#request-options).

**Returns:** `Function`. A function that accept one argument:
 - `options` - `Object`. _Optional_. [Request options](#request-options)

## `get`

Prepare a `GET` request function that will obtain a single resource by its identifier.

```js
rachel.get(path, options)
```

 - `path` - `String`. **Required**. [URI path pattern](#uri-path-pattern).
 - `options` - `Object`. _Optional_. [Request options](#request-options).

**Returns:** `Function`. A function that accept two arguments:
 - `id` - `Object`. **Required**. The resource identifier. 
 - `options` - `Object`. _Optional_. [Request options](#request-options)

## `post`

Prepare a `POST` request function that will create a new resource.

```js
rachel.post(path, options)
```

 - `path` - `String`. **Required**. [URI path pattern](#uri-path-pattern).
 - `options` - `Object`. _Optional_. [Request options](#request-options).

**Returns:** `Function`. A function that accept two arguments:
 - `data` - `Object`. **Required**. The data of the resource to create.
 - `options` - `Object`. _Optional_. [Request options](#request-options)

## `put`

Prepare a `PUT` request function that will update an existing resource.

```js
rachel.put(path, options)
```
 - `path` - `String`. **Required**. [URI path pattern](#uri-path-pattern).
 - `options` - `Object`. _Optional_. [Request options](#request-options).

**Returns:** `Function`. A function that accept three arguments:
 - `id` - `Object`. **Required**. The resource identifier.
 - `data` - `Object`. **Required**. The resource to be updated.
 - `options` - `Object`. _Optional_. [Request options](#request-options)

## `del`

Prepare a `DELETE` request function that will delete an existing resource

```js
rachel.del(path, options)
```

 - `path` - `String`. **Required**. [URI path pattern](#uri-path-pattern).
 - `options` - `Object`. _Optional_. [Request options](#request-options).

**Returns:** `Function`. A function that accept two arguments:
 - `id` - `Object`. **Required**. The resource identifier.
 - `options` - `Object`. _Optional_. [Request options](#request-options)

### URI path pattern

An URI path pattern is a `String` that contains placeholders. For example: '/users/:id' is an URI pattern that contain a placeholder (`:id`). **Rachel** interpret strings that starts with `:` as placeholders that will be replaced with an identifier or a data object.

 | URI path pattern | `id`  | `data`            | Result       |
 | ---------------- | ----- | ----------------- | ------------ |
 | `/users/:id`     | `123` |                   | `/users/123` |
 | `/roles/:name`   |       | `{ name: 'foo' }` | `/roles/foo` |
 | `/users/:id`     | `123` | `{ id: 456 }`     | `/users/123` |

> 💁 **Rachel** prioritize identifiers over data objects.

### Request Options

 - `prefix` - `String`. **Default: `null`**. The prefix to add to all API requests.
 - `cache` - `Boolean`. **Default: `false`**. Indicate if the request should be cached.
 - `multiple` - `Boolean`. **Default: `true`**. Indicate if the request can be issued multiple times, if `false` all subsequent request will return the same promise.

## Development

 - `yarn build` - Build production assets.

<div align=center>
  <p>MIT License</p>
  <p>Created with ❤️ by <a href="https://github.com/rmariuzzo">Rubens Mariuzzo</a></p>
  <small>Amelie <strong>Rachel</strong> – my first born daughter</small>
</div>
