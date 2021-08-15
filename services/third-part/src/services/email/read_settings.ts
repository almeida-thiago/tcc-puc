import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { EmailSettings } from '@models/email'
import { Errors } from '@enums/errors'
import selectSettings from '@repositories/settings/select'

/**
 * Read application e-mail settings
 * @param {RequestInfo} reqInfo request info data
 */
export default async (reqInfo: RequestInfo): Promise<EmailSettings> => {
  try {
    const payload: EmailSettings = await selectSettings()
    if (!payload) {
      throw new Error('Settings not found in database')
    }
    logger('info', 'Application e-mail settings read', reqInfo)
    delete payload.email_password
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on channels read: ${error}`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ESR1',
      errorMessage: Errors.ESR1,
      errorDetails: error
    }
  }
}
