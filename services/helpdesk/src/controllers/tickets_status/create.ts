import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import createTicketsStatus from '@services/tickets_status/create'
import { RequestInfo } from '@models/request'
import { Status } from '@models/status'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Status = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Status = await createTicketsStatus(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
