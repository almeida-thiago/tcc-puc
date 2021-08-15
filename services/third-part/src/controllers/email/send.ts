import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { EmailSend } from '@models/email'
import sendEmail from '@services/email/send'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: EmailSend = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: object = await sendEmail(data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
