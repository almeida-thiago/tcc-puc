import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Channel } from '@models/channel'
import { Errors } from '@enums/errors'
import selectChannels from '@repositories/channels/select'

/**
 * Read channel
 * @param {number} [id] channel id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number | null, reqInfo: RequestInfo): Promise<Channel | Channel[]> => {
  try {
    const payload: Channel | Channel[] = await selectChannels(id)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Channels read: ${id ? id : 'all'}`, reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on channels read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'ECR2',
      errorMessage: Errors.ECR2,
      errorDetails: error
    }
  }
}
