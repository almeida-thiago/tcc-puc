import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Type } from '@models/type'
import { Errors } from '@enums/errors'
import selectTicketsStatus from '@repositories/tickets_types/select'

/**
 * Read tickets types
 * @param {number} [id] tickets types id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number | null, reqInfo: RequestInfo): Promise<Type | Type[]> => {
  try {
    const payload: Type | Type[] = await selectTicketsStatus(id)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Tickets types read: ${id ? id : 'all'}`, reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on tickets types read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'EYR2',
      errorMessage: Errors.EYR2,
      errorDetails: error
    }
  }
}
