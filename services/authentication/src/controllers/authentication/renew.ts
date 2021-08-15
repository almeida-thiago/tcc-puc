import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import renewAuthentication from '@services/authentication/renew'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const token: string | null = req.headers.authorization || null
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: { token: string } = await renewAuthentication(token, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
