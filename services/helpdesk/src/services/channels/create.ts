import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Channel } from '@models/channel'
import { Errors } from '@enums/errors'
import insertChannels from '@repositories/channels/insert'

/**
 * Create new channel
 * @param {Channel} data channel data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Channel, reqInfo: RequestInfo): Promise<Channel> => {
  try {
    const payload: Channel = await insertChannels(data)
    logger('info', `New channel created`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new channel (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ECC1',
      errorMessage: Errors.ECC1,
      errorDetails: error || error.message
    }
  }
}
