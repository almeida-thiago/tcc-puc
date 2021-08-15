import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import readTicketsAttachaments from '@services/tickets_attachaments/read'
import { RequestInfo } from '@models/request'
import { Attachament } from '@models/attachament'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const ticket_id: any = req.query.ticket
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Attachament | Attachament[] = await readTicketsAttachaments(id, ticket_id, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
