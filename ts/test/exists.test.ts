
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FastlineVpnSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FastlineVpnSDK.test()
    equal(null !== testsdk, true)
  })

})
