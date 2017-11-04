import Rachel from '../src/Rachel'

describe('Rachel.del', () => {

  it('should prepare a DELETE request', () => {
    const del = Rachel.del('/test')
    del().then(({ options }) => expect(options.method).toBe('DELETE'))
  })

  it('should format the URI pattern', () => {
    const del = Rachel.del('/test/:id')
    del(123).then(({ uri }) => expect(uri).toBe('/test/123'))
  })

  it('should prioritize a given identifier over options data', () => {
    const del = Rachel.del('/test/:id')
    del(123, { data: { id: 456} }).then(({ uri }) => expect(uri).toBe('/test/123'))
  })

  it('should accept a prefix option', () => {
    const del = Rachel.del('/test/:id', { prefix: '/api' })
    del(123).then(({ uri }) => expect(uri).toBe('/api/test/123'))
  })

  it('should accept a queue option', () => {
    let a, b
    const delQueue = Rachel.del('/test/:id', { queue: true })

    a = delQueue(123)
    b = delQueue(123)
    expect(a).toBe(b)

    a = delQueue(456)
    b = delQueue(789)
    expect(a).not.toBe(b)

    const delNoQueue = Rachel.del('/test/:id', { queue: false })

    a = delNoQueue(123)
    b = delNoQueue(123)
    expect(a).not.toBe(b)
  })

  it('should accept a cache option', () => {
    let a, b, c

    const promisesCache = []
    const delCache = Rachel.del('/test/:id', { cache: true })

    promisesCache.push(delCache(123).then(({ uid }) => a = uid))
    promisesCache.push(delCache(123).then(({ uid }) => b = uid))
    promisesCache.push(delCache(456).then(({ uid }) => c = uid))

    return Promise.all(promisesCache).then(() => {
      expect(a).toBe(b)
      expect(c).not.toBe(a)
    })

    const promisesNoCache = []
    const delNoCache = Rachel.del('/test/:id', { cache: false })

    promisesNoCache.push(delNoCache(123).then(({ uid }) => a = uid))
    promisesNoCache.push(delNoCache(123).then(({ uid }) => b = uid))

    return Promise.all(promisesNoCache).then(() => {
      expect(a).not.toBe(b)
    })
  })

  it('should accept an extract option', () => {
    const delValidExtract = Rachel.del('/test/:id', { extract: 'uid' })
    delValidExtract(123).then((uid) => expect(typeof uid).toBe('number'))

    const delInvalidExtract = Rachel.del('/test/:id', { extract: '_undefined_' })
    delInvalidExtract(123).then((_undefined_) => expect(_undefined_).toBeUndefined())
  })

})
