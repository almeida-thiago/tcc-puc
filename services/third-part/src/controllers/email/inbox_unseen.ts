import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import emailInboxUnseen from '@services/email/inbox_unseen'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: boolean = await emailInboxUnseen(reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
