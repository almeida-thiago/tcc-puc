import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { User } from '@models/user'
import updateUser from '@services/users/update'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id
    const data: User = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: User = await updateUser(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
