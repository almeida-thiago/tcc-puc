import logger from '@utils/logger'
import updatePeoplePhoneNumbers from '@repositories/people_phone_numbers/update'
import { RequestInfo } from '@models/request'
import { PhoneNumber } from '@models/phone_number'
import { Errors } from '@enums/errors'

/**
 * Update person phone number
 * @param {number} id phone number id
 * @param {PhoneNumber} data phone number data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, data: PhoneNumber, reqInfo: RequestInfo): Promise<PhoneNumber> => {
  try {
    const payload:PhoneNumber = await updatePeoplePhoneNumbers(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Person phone number updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update person phone number (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ETU3',
      errorMessage: Errors.ETU3,
      errorDetails: error || error.message
    }
  }
}
