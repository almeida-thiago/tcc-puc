import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { Person } from '@models/person'
import updatePeople from '@services/people/update'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id
    const data: Person = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Person = await updatePeople(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
