import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import updateChannels from '@services/channels/update'
import { RequestInfo } from '@models/request'
import { Channel } from '@models/channel'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const data: Channel = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Channel = await updateChannels(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
