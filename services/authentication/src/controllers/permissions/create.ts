import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { Permission } from '@models/permission'
import createPermissions from '@services/permissions/create'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Permission = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Permission = await createPermissions(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
