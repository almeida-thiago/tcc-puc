import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { ChangePassword } from '@models/password'
import changePassword from '@services/recovery/changePassword'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: ChangePassword = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: null = await changePassword(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
