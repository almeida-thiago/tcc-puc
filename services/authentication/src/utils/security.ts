import axios, { AxiosResponse } from 'axios'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import logger from '@utils/logger'
import formatter from '@utils/formatter'
import { getReqInfo, isDevelopment } from '@utils/generals'
import validateAuthentication from '@services/authentication/validate'
import { Errors } from '@enums/errors'
import { RequestInfo } from '@models/request'

export default (grant: number): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (isDevelopment()) {
      next()
    } else {
      try {
        const token: string | null = req.headers.authorization || null
        const personId: any = req.query.person_id ? req.query.person_id : null
        const reqInfo: RequestInfo = getReqInfo(req)
        const response: boolean = await validateAuthentication(token, grant, personId, reqInfo)
        if (!response) {
          throw new Error('invalid token')
        }
        next()
      } catch (error) {
        logger('error', `Access not allowed to this resource (${error.errorMessage})`)
        res.status(401).send(formatter.error({
          httpCode: 401,
          errorCode: 'E401',
          errorMessage: Errors.E401,
          errorDetails: error || error.message
        }))
      }
    }
  }

export const validateRecaptcha = async (recaptchaToken: string): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${recaptchaToken}`)
    if (response.data.success) {
      return true
    }
    return false
  } catch (error) {
    throw new Error(error)
  }
}
