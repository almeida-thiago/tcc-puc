import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'
import infoTickets from '@repositories/tickets/info'

/**
 * Read tickets infos
 * @param {string} [person_id] person id
 * @param {string} [agent_id] agent id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (person_id: string | null, agent_id: string | null, reqInfo: RequestInfo): Promise<any> => {
  try {
    const payload: any = await infoTickets(person_id, agent_id)
    logger('info', 'Tickets info', reqInfo)
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
