import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import updateTickets from '@services/tickets/update'
import { RequestInfo } from '@models/request'
import { Ticket } from '@models/ticket'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id
    const data: Ticket = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Ticket = await updateTickets(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
