
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Cie10SDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await Cie10SDK.test()
    equal(null !== testsdk, true)
  })

})
