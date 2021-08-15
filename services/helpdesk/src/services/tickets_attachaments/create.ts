import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Attachament } from '@models/attachament'
import { Errors } from '@enums/errors'
import insertTicketsAttachaments from '@repositories/tickets_attachaments/insert'

/**
 * Create new ticket attachament
 * @param {Attachament} data ticket attachament data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Attachament, reqInfo: RequestInfo): Promise<Attachament> => {
  try {
    const payload: Attachament = await insertTicketsAttachaments(data)
    logger('info', `New ticket attachament created`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new ticket attachament (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EAC1',
      errorMessage: Errors.EAC1,
      errorDetails: error || error.message
    }
  }
}
