import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import createChannels from '@services/channels/create'
import { RequestInfo } from '@models/request'
import { Channel } from '@models/channel'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Channel = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Channel = await createChannels(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
