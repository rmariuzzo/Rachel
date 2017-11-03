import Rachel from '../src/Rachel'

describe('Rachel.list', () => {

  it('should prepare a GET request', () => {
    const list = Rachel.list('/test')
    list().then(({ options }) => expect(options.method).toBe('GET'))
  })

  it('should use the exact given path as the endpoint', () => {
    const endpoint = '/test'
    const list = Rachel.list(endpoint)
    list().then(({ uri }) => expect(uri).toBe(endpoint))
  })

  it('should accept a prefix option', () => {
    const prefix = '/v1'
    const endpoint = '/test'
    const list = Rachel.list(endpoint, { prefix })
    list().then(({ uri }) => expect(uri).toBe(prefix + endpoint))
  })

  it('should accept a queue option', () => {
    let a, b
    const listQueue = Rachel.list('/test', { queue: true })
    a = listQueue()
    b = listQueue()
    expect(a).toBe(b)

    const listNoQueue = Rachel.list('/test', { queue: false })
    a = listNoQueue()
    b = listNoQueue()
    expect(a).not.toBe(b)
  })

  it('should accept a cache option', () => {
    let a, b

    const promisesCache = []
    const listCache = Rachel.list('/test', { cache: true })

    promisesCache.push(listCache().then(({ uid }) => a = uid))
    promisesCache.push(listCache().then(({ uid }) => b = uid))

    return Promise.all(promisesCache).then(() => expect(a).toBe(b))

    const promisesNoCache = []
    const listNoCache = Rachel.list('/test', { cache: false })

    promisesNoCache.push(listNoCache().then(({ uid }) => a = uid))
    promisesNoCache.push(listNoCache().then(({ uid }) => b = uid))

    return Promise.all(promisesNoCache).then(() => expect(a).not.toBe(b))
  })

  it('should accept an extract option', () => {
    const listValidExtract = Rachel.list('/test', { extract: 'uid' })
    listValidExtract().then((uid) => expect(typeof uid).toBe('number'))

    const listInvalidExtract = Rachel.list('/test', { extract: '_undefined_' })
    listInvalidExtract().then((_undefined_) => expect(_undefined_).toBeUndefined())
  })

})
