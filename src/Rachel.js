/*!
 * Rachel - RESTful API Client helper.
 * Copyright(c) 2017 Rubens Mariuzzo
 * MIT Licensed
 */

/**
 * Export modules.
 * @public
 */

export default {
  createApi,
  list,
  get,
  post,
  put,
  del,
}

/**
 * Create an API wrapper with options that will be transferred to all requests.
 * @paarm {String} baseUrl The API base URL.
 * @param {Object} options Request options.
 * @return {Object}
 */

function createApi(baseUrl, options) {

  if (typeof baseUrl !== 'string') {
    throw new Error('the base URL must be a string')
  }

  const defaults = { baseUrl, ...options }

  return {
    list: (path, options) => list(path, { ...defaults, ...options }),
    get: (path, options) => get(path, { ...defaults, ...options }),
    post: (path, options) => post(path, { ...defaults, ...options }),
    put: (path, options) => put(path, { ...defaults, ...options }),
    del: (path, options) => del(path, { ...defaults, ...options }),
  }
}

/**
 * Prepare a request to list all resources.
 * @param {String} path The URI path.
 * @param {Object} options The request options.
 */

function list(path, options) {
  if (typeof path !== 'string') {
    throw new Error('the path must be a string')
  }

  const defaults = options

  return (options) => request(path, {
    ...defaults,
    ...options,
    method: 'GET'
  })
}

/**
 * Prepare a request to get a single a resource by its identifier.
 * @param {String} path The URI path.
 * @param {Object} options The request options.
 */

function get(path, options) {
  if (typeof path !== 'string') {
    throw new Error('the path must be a string')
  }

  const defaults = options

  return (id, options) => request(path, {
    ...defaults,
    ...options,
    method: 'GET',
    id
  })
}

/**
 * Prepare a request to create a new resource.
 * @param {String} path The URI path.
 * @param {Object} options The request options.
 */

function post(path, options) {
  if (typeof path !== 'string') {
    throw new Error('the path must be a string')
  }

  const defaults = options

  return (data, options) => request(path, {
    ...defaults,
    ...options,
    method: 'POST',
    data
  })
}

/**
 * Prepare a request to update an existing resource.
 * @param {String} path The URI path.
 * @param {Object} options The request options.
 */

function put(path, options) {
  if (typeof path !== 'string') {
    throw new Error('the path must be a string')
  }

  const defaults = options

  return (id, data, options) => request(path, {
    ...defaults,
    ...options,
    method: 'PUT',
    id,
    data
  })
}

/**
 * Prepare a request to delete an existing resource.
 * @param {String} path The URI path.
 * @param {Object} options The request options.
 */

function del(path, options) {
  if (typeof path !== 'string') {
    throw new Error('the path must be a string')
  }

  const defaults = options

  return (id, options) => request(path, {
    ...defaults,
    ...options,
    method: 'DELETE',
    id
  })
}

/**
 * Execute a request.
 * @param {String} uri The URI path.
 * @param {Object} options The request options.
 * @return {Promise}
 */

request.cache = {}
request.queue = {}

function request(uri, options) {

  // Format the URI path.
  if (options.id !== undefined) {
    uri = formatUri(uri, { id: options.id })
  }

  if (options.data !== undefined) {
    uri = formatUri(uri, options.data)
  }

  // Add prefix to URI path.
  if (options.prefix) {
    uri = options.prefix + uri
  }

  const cacheKey = `${options.method}: ${uri}`

  // Return cached response if cache is enabled. This can be overriden if the user force it.
  if (options.cache) {
    if (request.cache[cacheKey]) {
      return request.cache[cacheKey].promise
    } else {
      // Create a promise that will be resolved later.
      request.cache[cacheKey] = {}
      request.cache[cacheKey].promise = new Promise((resolve) => {
        request.cache[cacheKey].resolve = resolve
      })
    }
  } else {
    delete request.cache[cacheKey]
  }

  // Return the current request if queue is enabled.
  if (options.queue && request.queue[uri]) {
    return request.queue[uri]
  }

  // Configure fetch options.
  const fetchOptions = {
    method: options.method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Add data to body if specified.
  if (options.data) {
    fetchOptions.body = JSON.stringify(options.data)
  }

  // Do the request.
  return request.queue[uri] = fetch(uri, fetchOptions)
    // Validate HTTP response
    .then((response) => {
      if (response.ok) {
        return response
      }
      throw new Error(`bad status code: ${response.status}`)
    })
    // Convert response to JSON.
    .then((response) => response.json())
    // Extract the value from a specific field if specified.
    .then((response) => options.extract ? response[options.extract] : response)
    .then((data) => {
      // Store date in cache if specified.
      if (options.cache) {
        request.cache[cacheKey].resolve(data)
      }

      // Remove data from queue.
      delete request.queue[uri]

      return data
    })
    .catch((error) => {
      // Reject cache promise.
      if (options.cache) {
        request.cache[cacheKey].reject(error)
        delete request.cache[cacheKey]
      }

      delete request.queue[uri]

      // Propagate error.
      if (!options.cache) {
        throw Error(error)
      }
    })
}

/**
 * Format an URI path that contains placeholder.
 * A placeholder has the following format: :key1, :key2 and so on.
 * @param {String} uri The URI path.
 * @param {Object} data The data to use when replacing placeholders.
 * @return {String}
 */

function formatUri(uri, data) {
  return uri.replace(/:(\w+)/g, (colon, match) => data[match])
}
