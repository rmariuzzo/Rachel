import Rachel from '../src/Rachel'

describe('Rachel.createApi(baseUrl, options)', () => {

  it('should expect a base url', () => {
    expect(() => Rachel.createApi()).toThrow()
  })

  it('should create an api object', () => {
    const api = Rachel.createApi('test')
    expect(api).toBeDefined()
    expect(api).toHaveProperty('list')
    expect(api).toHaveProperty('get')
    expect(api).toHaveProperty('post')
    expect(api).toHaveProperty('put')
    expect(api).toHaveProperty('del')
  })

  it('should transfer options down', () => {
    const requests = []
    const api = Rachel.createApi('test', { prefix: '/test-prefix' })

    const list = api.list('/test-resources')
    requests.push(list().then(({ uri }) => expect(uri).toBe('/test-prefix/test-resources')))

    const get = api.get('/test-resources')
    requests.push(get().then(({ uri }) => expect(uri).toBe('/test-prefix/test-resources')))

    const post = api.post('/test-resources')
    requests.push(post({}).then(({ uri }) => expect(uri).toBe('/test-prefix/test-resources')))

    const put = api.put('/test-resources')
    requests.push(put(123, {}).then(({ uri }) => expect(uri).toBe('/test-prefix/test-resources')))

    const del = api.del('/test-resources')
    requests.push(del(123).then(({ uri }) => expect(uri).toBe('/test-prefix/test-resources')))

    return Promise.all(requests)
  })

})
