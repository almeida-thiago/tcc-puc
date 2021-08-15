import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Status } from '@models/status'
import { Errors } from '@enums/errors'
import updateTicketsStatus from '@repositories/tickets_status/update'

/**
 * Update ticket status
 * @param {number} [id] ticket status id
 * @param {Status} data ticket status data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, data: Status, reqInfo: RequestInfo): Promise<Status> => {
  try {
    const payload: Status = await updateTicketsStatus(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Ticket status updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update ticket status (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ESU3',
      errorMessage: Errors.ESU3,
      errorDetails: error || error.message
    }
  }
}
