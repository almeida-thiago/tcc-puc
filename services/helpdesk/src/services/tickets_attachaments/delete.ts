import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'
import deleteTicketsAttachaments from '@repositories/tickets_attachaments/delete'

/**
 * Delete tickets attachament
 * @param {number} id tickets attachament id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deleteTicketsAttachaments(id)
    logger('info', `Tickets attachament deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete tickets attachament (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EAD4',
      errorMessage: Errors.EAD4,
      errorDetails: error || error.message
    }
  }
}
