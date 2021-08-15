import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { Email } from '@models/email'
import readPeopleEmails from '@services/people_emails/read'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const person_id: any = req.query.person
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Email | Email[] = await readPeopleEmails(id, person_id, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
