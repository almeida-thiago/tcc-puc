import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import createTickets from '@services/tickets/create'
import { RequestInfo } from '@models/request'
import { Ticket } from '@models/ticket'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Ticket = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Ticket = await createTickets(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
