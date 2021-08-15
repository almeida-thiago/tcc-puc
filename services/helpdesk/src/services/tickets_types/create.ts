import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Type } from '@models/type'
import { Errors } from '@enums/errors'
import insertTicketsStatus from '@repositories/tickets_types/insert'

/**
 * Create new ticket type
 * @param {Type} data ticket type data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Type, reqInfo: RequestInfo): Promise<Type> => {
  try {
    const payload: Type = await insertTicketsStatus(data)
    logger('info', `New ticket type created`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new ticket type (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EYC1',
      errorMessage: Errors.EYC1,
      errorDetails: error || error.message
    }
  }
}
