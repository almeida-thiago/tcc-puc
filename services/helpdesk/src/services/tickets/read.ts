import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Ticket } from '@models/ticket'
import { Errors } from '@enums/errors'
import selectTickets from '@repositories/tickets/select'

/**
 * Read ticket
 * @param {string} [id] ticket id
 * @param {string} [person_id] person id
 * @param {string} [agent_id] agent id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string | null, person_id: string | null, agent_id: string | null, reqInfo: RequestInfo): Promise<Ticket | Ticket[]> => {
  try {
    const payload: Ticket | Ticket[] = await selectTickets(id, person_id, agent_id)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Ticket read: ${id ? id : 'all'}`, reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on ticket read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'ETR2',
      errorMessage: Errors.ETR2,
      errorDetails: error
    }
  }
}
