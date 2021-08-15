import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Status } from '@models/status'
import { Errors } from '@enums/errors'
import insertTicketsStatus from '@repositories/tickets_status/insert'

/**
 * Create new ticket status
 * @param {Status} data ticket status data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Status, reqInfo: RequestInfo): Promise<Status> => {
  try {
    const payload: Status = await insertTicketsStatus(data)
    logger('info', `New ticket status created`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new ticket status (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ESC1',
      errorMessage: Errors.ESC1,
      errorDetails: error || error.message
    }
  }
}
