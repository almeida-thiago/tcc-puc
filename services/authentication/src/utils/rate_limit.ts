import rateLimite from 'express-rate-limit'
import formatter from '@utils/formatter'
import { Errors } from '@enums/errors'

export default (minutes: number, requests: number) =>
  rateLimite({
    windowMs: minutes * 60 * 1000,
    max: requests,
    message: formatter.error({
      httpCode: 429,
      errorCode: 'E429',
      errorMessage: Errors.E429,
      errorDetails: 'too many requests from this ip'
    })
  })
