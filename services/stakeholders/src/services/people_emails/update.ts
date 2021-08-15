import logger from '@utils/logger'
import updatePeopleEmails from '@repositories/people_emails/update'
import { RequestInfo } from '@models/request'
import { Email } from '@models/email'
import { Errors } from '@enums/errors'

/**
 * Update person e-mail
 * @param {number} id e-mail id
 * @param {Email} data e-mail data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, data: Email, reqInfo: RequestInfo): Promise<Email> => {
  try {
    const payload: Email = await updatePeopleEmails(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Person e-mail updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update person e-mail (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EEU3',
      errorMessage: Errors.EEU3,
      errorDetails: error || error.message
    }
  }
}
