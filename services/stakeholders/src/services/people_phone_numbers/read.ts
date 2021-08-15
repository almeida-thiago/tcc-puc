import logger from '@utils/logger'
import selectPeoplePhoneNumbers from '@repositories/people_phone_numbers/select'
import { RequestInfo } from '@models/request'
import { PhoneNumber } from '@models/phone_number'
import { Errors } from '@enums/errors'

/**
 * Read people phone numbers
 * @param {number} [id] phone number id
 * @param {string} [person_id] person id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number | null, person_id: string | null, reqInfo: RequestInfo): Promise<PhoneNumber | PhoneNumber[]> => {
  try {
    const payload:PhoneNumber | PhoneNumber[] = await selectPeoplePhoneNumbers(id, person_id)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Person phone numbers read: ${id ? id : 'all'}`, reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on people phone numbers read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'ETR2',
      errorMessage: Errors.ETR2,
      errorDetails: error
    }
  }
}
