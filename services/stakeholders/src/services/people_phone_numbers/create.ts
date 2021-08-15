import logger from '@utils/logger'
import insertPeoplePhoneNumbers from '@repositories/people_phone_numbers/insert'
import { RequestInfo } from '@models/request'
import { PhoneNumber } from '@models/phone_number'
import { Errors } from '@enums/errors'

/**
 * Create new person phone number
 * @param {PhoneNumber} data phone number data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: PhoneNumber, reqInfo: RequestInfo): Promise<PhoneNumber> => {
  try {
    const payload:PhoneNumber = await insertPeoplePhoneNumbers(data)
    logger('info', `New person phone number created`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new person phone number (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ETC1',
      errorMessage: Errors.ETC1,
      errorDetails: error || error.message
    }
  }
}
