import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { PhoneNumber } from '@models/phone_number'
import createPeoplePhoneNumbers from '@services/people_phone_numbers/create'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data: PhoneNumber = req.body
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: PhoneNumber = await createPeoplePhoneNumbers(data, reqInfo)
    res.status(201).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
