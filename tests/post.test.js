import Rachel from '../src/Rachel'

describe('Rachel.post', () => {

  it('should prepare a POST request', () => {
    const post = Rachel.post('/test')
    post().then(({ options }) => expect(options.method).toBe('POST'))
  })

  it('should prioritize a given identifier over options data', () => {
    const post = Rachel.post('/test')
    const data = { test: 123 }
    post(data).then(({ options }) => expect(options.body).toBe(JSON.stringify(data)))
  })

  it('should accept a prefix option', () => {
    const post = Rachel.post('/test', { prefix: '/api' })
    post(123).then(({ uri }) => expect(uri).toBe('/api/test'))
  })

  it('should accept a queue option', () => {
    let a, b
    const postQueue = Rachel.post('/test', { queue: true })

    a = postQueue({ test: 123 })
    b = postQueue({ test: 123 })
    expect(a).toBe(b)

    const postNoQueue = Rachel.post('/test', { queue: false })

    a = postNoQueue({ test: 123 })
    b = postNoQueue({ test: 123 })
    expect(a).not.toBe(b)
  })

  it('should accept a cache option', () => {
    let a, b

    const promisesCache = []
    const postCache = Rachel.post('/test', { cache: true })

    promisesCache.push(postCache({ test: 123 }).then(({ uid }) => a = uid))
    promisesCache.push(postCache({ test: 123 }).then(({ uid }) => b = uid))

    return Promise.all(promisesCache).then(() => {
      expect(a).toBe(b)
    })

    const promisesNoCache = []
    const postNoCache = Rachel.post('/test', { cache: false })

    promisesNoCache.push(postNoCache({ test: 123 }).then(({ uid }) => a = uid))
    promisesNoCache.push(postNoCache({ test: 123 }).then(({ uid }) => b = uid))

    return Promise.all(promisesNoCache).then(() => {
      expect(a).not.toBe(b)
    })
  })

  it('should accept an extract option', () => {
    const postValidExtract = Rachel.post('/test/:id', { extract: 'uid' })
    postValidExtract({ test: 123 }).then((uid) => expect(typeof uid).toBe('number'))

    const postInvalidExtract = Rachel.post('/test/:id', { extract: '_undefined_' })
    postInvalidExtract({ test: 123 }).then((_undefined_) => expect(_undefined_).toBeUndefined())
  })

})
