import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'
import deleteTicketsMessages from '@repositories/tickets_messages/delete'

/**
 * Delete ticket message
 * @param {number} id ticket message id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deleteTicketsMessages(id)
    logger('info', `Ticket message deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete person (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EMD4',
      errorMessage: Errors.EMD4,
      errorDetails: error || error.message
    }
  }
}
