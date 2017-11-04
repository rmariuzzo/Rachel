import Rachel from '../src/Rachel'

describe('Rachel.get', () => {

  it('should prepare a GET request', () => {
    const get = Rachel.get('/test')
    get().then(({ options }) => expect(options.method).toBe('GET'))
  })

  it('should format the URI pattern', () => {
    const get = Rachel.get('/test/:id')
    get(123).then(({ uri }) => expect(uri).toBe('/test/123'))
  })

  it('should prioritize a given identifier over options data', () => {
    const get = Rachel.get('/test/:id')
    get(123, { data: { id: 456} }).then(({ uri }) => expect(uri).toBe('/test/123'))
  })

  it('should accept a prefix option', () => {
    const get = Rachel.get('/test/:id', { prefix: '/api' })
    get(123).then(({ uri }) => expect(uri).toBe('/api/test/123'))
  })

  it('should accept a queue option', () => {
    let a, b
    const getQueue = Rachel.get('/test/:id', { queue: true })

    a = getQueue(123)
    b = getQueue(123)
    expect(a).toBe(b)

    a = getQueue(456)
    b = getQueue(789)
    expect(a).not.toBe(b)

    const getNoQueue = Rachel.get('/test/:id', { queue: false })

    a = getNoQueue(123)
    b = getNoQueue(123)
    expect(a).not.toBe(b)
  })

  it('should accept a cache option', () => {
    let a, b, c

    const promisesCache = []
    const getCache = Rachel.get('/test/:id', { cache: true })

    promisesCache.push(getCache(123).then(({ uid }) => a = uid))
    promisesCache.push(getCache(123).then(({ uid }) => b = uid))
    promisesCache.push(getCache(456).then(({ uid }) => c = uid))

    return Promise.all(promisesCache).then(() => {
      expect(a).toBe(b)
      expect(c).not.toBe(a)
    })

    const promisesNoCache = []
    const getNoCache = Rachel.get('/test/:id', { cache: false })

    promisesNoCache.push(getNoCache(123).then(({ uid }) => a = uid))
    promisesNoCache.push(getNoCache(123).then(({ uid }) => b = uid))

    return Promise.all(promisesNoCache).then(() => {
      expect(a).not.toBe(b)
    })
  })

  it('should accept an extract option', () => {
    const getValidExtract = Rachel.get('/test/:id', { extract: 'uid' })
    getValidExtract(123).then((uid) => expect(typeof uid).toBe('number'))

    const getInvalidExtract = Rachel.get('/test/:id', { extract: '_undefined_' })
    getInvalidExtract(123).then((_undefined_) => expect(_undefined_).toBeUndefined())
  })

})
