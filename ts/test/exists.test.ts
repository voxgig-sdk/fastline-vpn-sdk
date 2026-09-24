
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FastlineVpnSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FastlineVpnSDK.test()
    equal(testsdk instanceof FastlineVpnSDK, true,
      'FastlineVpnSDK.test() must return a client synchronously')
  })

})
