
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Cie10SDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = Cie10SDK.test()
    equal(testsdk instanceof Cie10SDK, true,
      'Cie10SDK.test() must return a client synchronously')
  })

})
