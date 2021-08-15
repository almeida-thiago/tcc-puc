import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Message } from '@models/message'
import { Attachament } from '@models/attachament'
import { Errors } from '@enums/errors'
import selectTicketsMessages from '@repositories/tickets_messages/select'
import selectTicketsAttachaments from '@repositories/tickets_attachaments/select'

const addAttachamentToMessage = (message: Message | Message[], attachament: Attachament | Attachament[]): Message | Message[] => {
  const attachamentsList: Attachament[] = Array.isArray(attachament) ? attachament : [attachament]
  if (Array.isArray(message)) {
    return message.map((item: Message): Message => ({
      ...item,
      attachaments: attachamentsList.filter(({ message_id }: Attachament): boolean => String(message_id) === String(item.id))
    }))
  }
  return message
}

/**
 * Read tickets messages
 * @param {number} [id] ticket message id
 * @param {string} [ticket_id] ticket id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number | null, ticket_id: string | null, reqInfo: RequestInfo): Promise<Message | Message[]> => {
  try {
    const attachaments: Attachament | Attachament[] = await selectTicketsAttachaments(id, ticket_id)
    const messages: Message | Message[] = await selectTicketsMessages(id, ticket_id)
    if (!messages) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Tickets messages read: ${id ? id : 'all'}`, reqInfo)
    return addAttachamentToMessage(messages, attachaments)
  } catch (error) {
    error = error || error.message
    logger('error', `Error on tickets messages read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'EMR2',
      errorMessage: Errors.EMR2,
      errorDetails: error
    }
  }
}
