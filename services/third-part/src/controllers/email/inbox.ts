import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { EmailRead } from '@models/email'
import emailInbox from '@services/email/inbox'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: EmailRead[] = await emailInbox(reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
