import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'
import deleteTicketsStatus from '@repositories/tickets_status/delete'

/**
 * Delete ticket status
 * @param {number} id ticket status id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deleteTicketsStatus(id)
    logger('info', `ticket status deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete ticket status (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ESD4',
      errorMessage: Errors.ESD4,
      errorDetails: error || error.message
    }
  }
}
