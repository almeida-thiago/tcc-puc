import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { PhoneNumber } from '@models/phone_number'
import updatePeoplePhoneNumbers from '@services/people_phone_numbers/update'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const data: PhoneNumber = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: PhoneNumber = await updatePeoplePhoneNumbers(id, data, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
