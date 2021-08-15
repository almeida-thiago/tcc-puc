import logger from '@utils/logger'
import deletePeoplePhoneNumbers from '@repositories/people_phone_numbers/delete'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'

/**
 * Delete person phone number
 * @param {number} id phone number id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deletePeoplePhoneNumbers(id)
    logger('info', `Person phone number deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete person phone number (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ETD4',
      errorMessage: Errors.ETD4,
      errorDetails: error || error.message
    }
  }
}
