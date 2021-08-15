import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'
import deleteTicketsStatus from '@repositories/tickets_types/delete'

/**
 * Delete ticket type
 * @param {number} id ticket type id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deleteTicketsStatus(id)
    logger('info', `Ticket type deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete ticket type (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EYD4',
      errorMessage: Errors.EYD4,
      errorDetails: error || error.message
    }
  }
}
