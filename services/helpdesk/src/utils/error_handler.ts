import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { Errors } from '@enums/errors'

/**
 * Error handler
 * @param req express request
 * @param res express response
 */
 export default (req: Request, res: Response): void => {
  res.status(404).send(formatter.error({
    httpCode: 404,
    errorCode: 'E404',
    errorMessage: Errors.E404,
    errorDetails: null
  }))
}
