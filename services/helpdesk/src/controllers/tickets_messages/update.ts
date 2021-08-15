import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import updateTicketsMessages from '@services/tickets_messages/update'
import { RequestInfo } from '@models/request'
import { Message } from '@models/message'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const data: Message = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Message = await updateTicketsMessages(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
