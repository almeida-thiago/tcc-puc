import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import createTicketsTypes from '@services/tickets_types/create'
import { RequestInfo } from '@models/request'
import { Type } from '@models/type'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Type = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Type = await createTicketsTypes(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
