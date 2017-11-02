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

## Example

```js
// api.js
import rachel from 'rachel'

const api = rachel.createApi(options)

export default {
  users: {
    all: api.all('/users'),
    get: api.get('/users/:id'),
    save: api.save('/users'),
    update: api.update('/users/:id'),
    delete: api.delete('/users/:id'),
  }
}
```

```js
// main.js
import api from './api'

api.users.all()             // GET:    /users
api.users.get(123)          // GET:    /users/123
api.users.save(user)        // POST:   /users
api.users.update(123, user) // PUT:    /users/123 { "name": "foo" }
api.users.delete(123)       // DELETE: /users/123
```

## Documentation

### `createApi`

Create an API wrapper with options.

```js
rachel.createApi(options)
```

 - `options` - `Object`. _Optional_. A hash of options.
   - `prefix` - `String`. The prefix to add to all API requests

## `all`

Prepare a GET request function that will list all items of a resource.

```js
rachel.all(path, options)
```

 - `path` - `String`. **Required**. URI path pattern.
 - `options` - `Object`. _Optional_. Hash of options.
   - `query` - `Object`. Hash of query parameters.

**Returns:** `Function`
 - `options` - `Object`. _Optional_. Request options.

## `get`

Get a single resource by its identifier.

```js
rachel.get(path, options)
```

 - `path` - **Required**. The URI path.
 - `options` - `Object`. _Optional_. Request options.

**Returns:** `Function (id, options)`
 - `id` - `Object`. **Required**. The resource identifier.
 - `options` - `Object`. _Optional_. Request options.

## `post`

Create a new resource.

```js
rachel.post(path, options)
```

 - `path` - **Required**. The URI path.
 - `options` - `Object`. _Optional_. Request options.

**Returns:** `Function (data, options)`
 - `data` - `Object`. **Required**. The resource to be created.
 - `options` - `Object`. _Optional_. Request options.

## `put`

Update an existing resource.

```js
rachel.put(path, options)
```

 - `path` - **Required**. The URI path.
 - `options` - `Object`. _Optional_. Request options.

**Returns:** `Function (id, data, options)`
 - `id` - `Object`. **Required**. The resource identifier.
 - `data` - `Object`. **Required**. The resource to be updated.
 - `options` - `Object`. _Optional_. Request options.

## `delete`

Delete an existing resource.

```js
rachel.delete(path, options)
```

 - `path` - **Required**. The URI path.
 - `options` - `Object`. _Optional_. Request options.

**Returns:** `Function (id, options)`
 - `id` - `Object`. **Required**. The resource identifier.
 - `options` - `Object`. _Optional_. Request options.

<div align=center>
  <p>MIT License</p>
  <p>Created with ❤️ by <a href="https://github.com/rmariuzzo">Rubens Mariuzzo</a></p>
  <small>Amelie <strong>Rachel</strong> – my first born daughter</small>
</div>
