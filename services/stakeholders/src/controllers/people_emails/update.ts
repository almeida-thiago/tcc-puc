import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { Email } from '@models/email'
import updatePeopleEmails from '@services/people_emails/update'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const data: Email = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Email = await updatePeopleEmails(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
