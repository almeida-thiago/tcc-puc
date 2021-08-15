import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { ForgotPassword } from '@models/password'
import forgotPassword from '@services/recovery/forgotPassword'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ForgotPassword = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: null = await forgotPassword(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
