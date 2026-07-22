
import { Context } from './Context'


class Cie10Error extends Error {

  isCie10Error = true

  sdk = 'Cie10'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  Cie10Error
}

