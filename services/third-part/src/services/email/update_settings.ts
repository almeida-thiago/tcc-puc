import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { EmailSettings } from '@models/email'
import { Errors } from '@enums/errors'
import updateSettings from '@repositories/settings/update'

/**
 * Update aplication e-mail settings
 * @param {EmailSettings} data e-mail settings data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: EmailSettings, reqInfo: RequestInfo): Promise<boolean> => {
  try {
    const payload: boolean = await updateSettings(data)
    if (!payload) {
      throw new Error(`Cannot update settings in database`)
    }
    logger('info', 'Settings updated', reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update settings (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ESU2',
      errorMessage: Errors.ESU2,
      errorDetails: error || error.message
    }
  }
}
