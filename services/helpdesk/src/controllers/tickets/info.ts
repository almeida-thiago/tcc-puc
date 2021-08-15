import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import infoTickets from '@services/tickets/info'
import { RequestInfo } from '@models/request'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const person_id: any = req.query.person_id
    const agent_id: any = req.query.person_id
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: any = await infoTickets(person_id, agent_id, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
