import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { User } from '@models/user'
import createUser from '@services/users/create'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: User = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: User = await createUser(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
