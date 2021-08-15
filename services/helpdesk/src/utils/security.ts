import { NextFunction, Request, Response, RequestHandler } from 'express'
import axios, { AxiosResponse } from 'axios'
import logger from '@utils/logger'
import formatter from '@utils/formatter'
import { isDevelopment } from '@utils/generals'
import { Errors } from '@enums/errors'

export default (grant: number): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (isDevelopment()) {
      next()
    } else {
      try {
        const personId: any = req.query.person_id ? req.query.person_id : null
        const response: AxiosResponse = await axios.post(`${process.env.AUTH_SERVICE_URL}/v1/validate`, { grant, personId }, { headers: req.headers })
        if (!response.data.success) {
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
