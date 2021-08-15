import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { User, UserSignUp } from '@models/user'
import signUpUser from '@services/users/sign_up'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: UserSignUp = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: User = await signUpUser(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
