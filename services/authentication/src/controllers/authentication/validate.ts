import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import validateAuthentication from '@services/authentication/validate'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const token: string | null = req.headers.authorization || null
    const grant: number = req.body.grant || 9
    const personId: string | null = req.body.personId || null
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: any = await validateAuthentication(token, grant, personId, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
