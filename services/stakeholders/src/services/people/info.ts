import logger from '@utils/logger'
import infoPeople from '@repositories/people/info'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'

/**
 * Get people info
 * @param {string} [id] person id
 */
export default async (reqInfo: RequestInfo): Promise<any> => {
  try {
    const payload: any = await infoPeople()
    logger('info', 'People info', reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on people read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'EPR2',
      errorMessage: Errors.EPR2,
      errorDetails: error
    }
  }
}
