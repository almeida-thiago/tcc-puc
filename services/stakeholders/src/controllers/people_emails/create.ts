import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { Email } from '@models/email'
import createPeopleEmails from '@services/people_emails/create'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Email = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Email = await createPeopleEmails(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
