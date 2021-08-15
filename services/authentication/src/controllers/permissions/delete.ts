import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import deletePermissions from '@services/permissions/delete'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: null = await deletePermissions(id, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
