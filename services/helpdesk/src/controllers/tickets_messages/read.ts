import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import readTicketsMessages from '@services/tickets_messages/read'
import { RequestInfo } from '@models/request'
import { Message } from '@models/message'


export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const ticket_id: any = req.query.ticket
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Message | Message[] = await readTicketsMessages(id, ticket_id, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
