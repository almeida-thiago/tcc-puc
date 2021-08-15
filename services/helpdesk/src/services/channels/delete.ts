import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'
import deleteChannels from '@repositories/channels/delete'

/**
 * Delete channel
 * @param {number} id channel id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deleteChannels(id)
    logger('info', `Channel deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete channel (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ECD4',
      errorMessage: Errors.ECD4,
      errorDetails: error || error.message
    }
  }
}
