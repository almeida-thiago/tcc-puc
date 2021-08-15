import { Request, Response } from 'express'
import formatter from '@utils/formatter'
import { getReqInfo } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { PhoneNumber } from '@models/phone_number'
import readPeoplePhoneNumbers from '@services/people_phone_numbers/read'

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = Number(req.params.id)
    const person_id: any = req.query.person
    const reqInfo: RequestInfo = getReqInfo(req)
    const response: PhoneNumber | PhoneNumber[] = await readPeoplePhoneNumbers(id, person_id, reqInfo)
    res.status(200).send(formatter.success(response))
  } catch (error) {
    res.status(error.httpCode).send(formatter.error(error))
  }
}
