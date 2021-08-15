import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { EmailSettings } from '@models/email'
import updateSettings from '@services/email/update_settings'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: EmailSettings = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: boolean = await updateSettings(data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
