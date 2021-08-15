import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import updateTicketsTypes from '@services/tickets_types/update'
import { RequestInfo } from '@models/request'
import { Type } from '@models/type'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const data: Type = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Type = await updateTicketsTypes(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
