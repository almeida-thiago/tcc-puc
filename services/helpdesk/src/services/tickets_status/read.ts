import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Status } from '@models/status'
import { Errors } from '@enums/errors'
import selectTicketsStatus from '@repositories/tickets_status/select'

/**
 * Read tickets status
 * @param {number} [id] ticket status id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number | null, reqInfo: RequestInfo): Promise<Status | Status[]> => {
  try {
    const payload: Status | Status[] = await selectTicketsStatus(id)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Tickets status read: ${id ? id : 'all'}`, reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on tickets status read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'ESR2',
      errorMessage: Errors.ESR2,
      errorDetails: error
    }
  }
}
