import logger from '@utils/logger'
import insertPeopleEmails from '@repositories/people_emails/insert'
import { RequestInfo } from '@models/request'
import { Email } from '@models/email'
import { Errors } from '@enums/errors'

/**
 * Create new person e-mail
 * @param {Email} data e-mail data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Email, reqInfo: RequestInfo): Promise<Email> => {
  try {
    const payload: Email = await insertPeopleEmails(data)
    logger('info', `New person e-mail created`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new person e-mail (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EEC1',
      errorMessage: Errors.EEC1,
      errorDetails: error || error.message
    }
  }
}
