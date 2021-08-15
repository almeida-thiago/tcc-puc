import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import createTicketsMessages from '@services/tickets_messages/create'
import { RequestInfo } from '@models/request'
import { Message } from '@models/message'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Message = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Message = await createTicketsMessages(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
