import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Ticket } from '@models/ticket'
import { Errors } from '@enums/errors'
import updateTickets from '@repositories/tickets/update'

/**
 * Update ticket
 * @param {string} [id] ticket id
 * @param {Ticket} data ticket data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string, data: Ticket, reqInfo: RequestInfo): Promise<Ticket> => {
  try {
    const payload: Ticket = await updateTickets(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Ticket updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update ticket (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ETU3',
      errorMessage: Errors.ETU3,
      errorDetails: error || error.message
    }
  }
}
