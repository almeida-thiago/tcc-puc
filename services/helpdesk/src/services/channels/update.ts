import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Channel } from '@models/channel'
import { Errors } from '@enums/errors'
import updateChannels from '@repositories/channels/update'

/**
 * Update channel
 * @param {number} [id] channel id
 * @param {Channel} data channel data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, data: Channel, reqInfo: RequestInfo): Promise<Channel> => {
  try {
    const payload: Channel = await updateChannels(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Channel updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update channel (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ECU3',
      errorMessage: Errors.ECU3,
      errorDetails: error || error.message
    }
  }
}
