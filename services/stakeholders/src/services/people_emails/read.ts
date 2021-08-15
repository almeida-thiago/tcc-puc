import logger from '@utils/logger'
import selectPeopleEmails from '@repositories/people_emails/select'
import { RequestInfo } from '@models/request'
import { Email } from '@models/email'
import { Errors } from '@enums/errors'

/**
 * Read people e-mails
 * @param {string} [id] e-mail id
 * @param {string} [person_id] person id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number | null, person_id: string | null, reqInfo: RequestInfo): Promise<Email | Email[]> => {
  try {
    const payload: Email | Email[] = await selectPeopleEmails(id, person_id)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Person emails read: ${id ? id : 'all'}`, reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on people emails read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'EER2',
      errorMessage: Errors.EER2,
      errorDetails: error
    }
  }
}
