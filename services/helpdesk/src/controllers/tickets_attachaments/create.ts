import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import createTicketsAttachaments from '@services/tickets_attachaments/create'
import { RequestInfo } from '@models/request'
import { Attachament } from '@models/attachament'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Attachament = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Attachament = await createTicketsAttachaments(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
