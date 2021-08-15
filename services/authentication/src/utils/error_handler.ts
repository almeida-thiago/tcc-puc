import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { Errors } from '@enums/errors'

export default (req: Request, res: Response): void => {
  res.status(404).send(formatter.error({
    httpCode: 404,
    errorCode: 'E404',
    errorMessage: Errors.E404,
    errorDetails: null
  }))
}
