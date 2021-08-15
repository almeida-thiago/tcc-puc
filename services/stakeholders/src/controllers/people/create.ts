import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import createPeople from '@services/people/create'
import { RequestInfo } from '@models/request'
import { Person } from '@models/person'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Person = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Person = await createPeople(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
