import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Message } from '@models/message'
import { Errors } from '@enums/errors'
import updateTicketsMessages from '@repositories/tickets_messages/update'

/**
 * Update ticket message
 * @param {number} [id] ticket message id
 * @param {Message} data ticket message data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, data: Message, reqInfo: RequestInfo): Promise<Message> => {
  try {
    const payload: Message = await updateTicketsMessages(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Ticket message updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update ticket message (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EMU3',
      errorMessage: Errors.EMU3,
      errorDetails: error || error.message
    }
  }
}
