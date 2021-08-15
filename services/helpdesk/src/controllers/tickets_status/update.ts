import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import updateTicketsStatus from '@services/tickets_status/update'
import { RequestInfo } from '@models/request'
import { Status } from '@models/status'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const data: Status = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Status = await updateTicketsStatus(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
