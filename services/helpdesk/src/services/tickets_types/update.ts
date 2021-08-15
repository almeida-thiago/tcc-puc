import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Type } from '@models/type'
import { Errors } from '@enums/errors'
import updateTicketsStatus from '@repositories/tickets_types/update'

/**
 * Update ticket type
 * @param {number} [id] ticket type id
 * @param {Types} data ticket type data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, data: Type, reqInfo: RequestInfo): Promise<Type> => {
  try {
    const payload: Type = await updateTicketsStatus(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Ticket type updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update ticket type (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EYU3',
      errorMessage: Errors.EYU3,
      errorDetails: error || error.message
    }
  }
}
