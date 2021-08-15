import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { EmailSettings } from '@models/email'
import readSettings from '@services/email/read_settings'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: EmailSettings = await readSettings(reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
