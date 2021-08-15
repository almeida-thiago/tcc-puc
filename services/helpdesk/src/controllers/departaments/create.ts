import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import createDepartaments from '@services/departaments/create'
import { RequestInfo } from '@models/request'
import { Departament } from '@models/departament'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Departament = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Departament = await createDepartaments(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
