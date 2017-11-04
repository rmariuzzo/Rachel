import Rachel from '../src/Rachel'

describe('Rachel.put', () => {

  it('should prepare a PUT request', () => {
    const put = Rachel.put('/test')
    put().then(({ options }) => expect(options.method).toBe('PUT'))
  })

  it('should accept an identifier and payload data', () => {
    const put = Rachel.put('/test/:id')
    const data = { test: 457 }
    put(123, data).then(({ uri, options }) => {
      expect(uri).toBe('/test/123')
      expect(options.body).toBe(JSON.stringify(data))
    })
  })

  it('should accept a prefix option', () => {
    const put = Rachel.put('/test/:id', { prefix: '/api' })
    put(123, {}).then(({ uri }) => expect(uri).toBe('/api/test/123'))
  })

  it('should accept a queue option', () => {
    let a, b
    const putQueue = Rachel.put('/test/:id', { queue: true })

    a = putQueue(123, { test: 457 })
    b = putQueue(123, { test: 457 })
    expect(a).toBe(b)

    const putNoQueue = Rachel.put('/test/:id', { queue: false })

    a = putNoQueue(123, { test: 457 })
    b = putNoQueue(123, { test: 457 })
    expect(a).not.toBe(b)
  })

  it('should accept a cache option', () => {
    let a, b

    const promisesCache = []
    const putCache = Rachel.post('/test', { cache: true })

    promisesCache.push(putCache(123, { test: 457 }).then(({ uid }) => a = uid))
    promisesCache.push(putCache(123, { test: 457 }).then(({ uid }) => b = uid))

    return Promise.all(promisesCache).then(() => {
      expect(a).toBe(b)
    })

    const promisesNoCache = []
    const putNoCache = Rachel.post('/test', { cache: false })

    promisesNoCache.push(putNoCache(123, { test: 457 }).then(({ uid }) => a = uid))
    promisesNoCache.push(putNoCache(123, { test: 457 }).then(({ uid }) => b = uid))

    return Promise.all(promisesNoCache).then(() => {
      expect(a).not.toBe(b)
    })
  })

  it('should accept an extract option', () => {
    const putValidExtract = Rachel.put('/test/:id', { extract: 'uid' })
    putValidExtract(123, { test: 457 }).then((uid) => expect(typeof uid).toBe('number'))

    const putInvalidExtract = Rachel.put('/test/:id', { extract: '_undefined_' })
    putInvalidExtract(123, { test: 457 }).then((_undefined_) => expect(_undefined_).toBeUndefined())
  })

})
