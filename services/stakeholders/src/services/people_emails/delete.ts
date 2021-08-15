import logger from '@utils/logger'
import deletePeopleEmails from '@repositories/people_emails/delete'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'
/**
 * Delete person e-mail
 * @param {number} id e-mail id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deletePeopleEmails(id)
    logger('info', `Person e-mail deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete person e-mail (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EED4',
      errorMessage: Errors.EED4,
      errorDetails: error || error.message
    }
  }
}
