import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import readTickets from '@services/tickets/read'
import { RequestInfo } from '@models/request'
import { Ticket } from '@models/ticket'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id
    const person_id: any = req.query.person_id
    const agent_id: any = req.query.person_id
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Ticket | Ticket[] = await readTickets(id, person_id, agent_id, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
