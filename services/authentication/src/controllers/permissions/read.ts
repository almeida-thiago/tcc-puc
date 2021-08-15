import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { Permission } from '@models/permission'
import readPermissions from '@services/permissions/read'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id)
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Permission | Permission[] = await readPermissions(id, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
