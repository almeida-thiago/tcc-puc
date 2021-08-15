import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'
import deleteTickets from '@repositories/tickets/delete'
/**
 * Delete ticket
 * @param {string} id ticket id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deleteTickets(id)
    logger('info', `Ticket deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete ticket (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ETD4',
      errorMessage: Errors.ETD4,
      errorDetails: error || error.message
    }
  }
}
