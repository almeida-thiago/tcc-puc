import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import updateDepartaments from '@services/departaments/update'
import { RequestInfo } from '@models/request'
import { Departament } from '@models/departament'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const data: Departament = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: Departament = await updateDepartaments(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
