global.fetch = jest.fn().mockImplementation((uri, options) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ uri, options })
  })
})
