import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import deleteTicketsTypes from '@services/tickets_types/delete'
import { RequestInfo } from '@models/request'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: null = await deleteTicketsTypes(id, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
