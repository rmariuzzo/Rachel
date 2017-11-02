

/**
 * Export modules.
 * @public
 */

export {
  createApi,
  list,
  get,
  post,
  put,
  del,
}

/**
 * Create an API wrapper with options that will be transferred to all requests.
 * @param {Object} options Request options.
 */

function createApi(options) {
  const apiOptions = options
  return {
    list: (path, options) => list(path, { ...apiOptions, ...options }),
    get: (path, options) => get(path, { ...apiOptions, ...options }),
    post: (path, options) => post(path, { ...apiOptions, ...options }),
    put: (path, options) => put(path, { ...apiOptions, ...options }),
    del: (path, options) => del(path, { ...apiOptions, ...options }),
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

  return () => request(path, { ...options, method: 'GET' })
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

  return (id, options) => {
    request(path, { ...options, method: 'GET', id })
  }
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

  return (data, options) => {
    request(path, { ...options, method: 'POST', data })
  }
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

  return (id, data, options) => {
    request(path, { ...options, method: 'PUT', id, data })
  }
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

  return (id, options) => {
    request(path, { ...options, method: 'DELETE', id })
  }
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

  // Return cached response if cache was enabled. This can be overriden if the user force it.
  if (options.cache && request.cache[uri] && !options.force) {
    return Promise.resolve(request.cache[uri])
  }

  // Return the current request if multiple are not allowed.
  if (options.multiple === false && request.queue[uri]) {
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
  return fetcher[uri] = fetch(uri, fetchOptions)
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
        request.cache[uri] = data
      }

      // Remove data from queue.
      delete request.queue[uri]

      return data
    })
}

function formatUri(uri, data) {
  return uri.replace(/:(\w+)/g, (colon, match) => data[match])
}
