import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { Permission } from '@models/permission'
import updatePermissions from '@services/permissions/update'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id
    const data: Permission = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Permission = await updatePermissions(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
