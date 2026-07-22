
import { Context } from './Context'


class FastlineVpnError extends Error {

  isFastlineVpnError = true

  sdk = 'FastlineVpn'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FastlineVpnError
}

