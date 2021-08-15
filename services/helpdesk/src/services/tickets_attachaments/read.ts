import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Attachament } from '@models/attachament'
import { Errors } from '@enums/errors'
import selectTicketsAttachaments from '@repositories/tickets_attachaments/select'

/**
 * Read tickets attachaments
 * @param {number} [id] ticket attachaments id
 * @param {string} [ticket_id] ticket id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number | null, ticket_id: string | null, reqInfo: RequestInfo): Promise<Attachament | Attachament[]> => {
  try {
    const payload: Attachament | Attachament[] = await selectTicketsAttachaments(id, ticket_id)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Tickets attachaments read: ${id ? id : 'all'}`, reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on tickets attachaments read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'EAR2',
      errorMessage: Errors.EAR2,
      errorDetails: error
    }
  }
}
