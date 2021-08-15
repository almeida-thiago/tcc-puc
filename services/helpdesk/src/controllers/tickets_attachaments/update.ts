import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import updateTicketsAttachaments from '@services/tickets_attachaments/update'
import { RequestInfo } from '@models/request'
import { Attachament } from '@models/attachament'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const data: Attachament = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Attachament = await updateTicketsAttachaments(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
