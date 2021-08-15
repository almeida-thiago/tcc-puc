import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { Person } from '@models/person'
import readPeople from '@services/people/read'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Person | Person[] = await readPeople(id, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
