import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Attachament } from '@models/attachament'
import { Errors } from '@enums/errors'
import updateTicketsAttachaments from '@repositories/tickets_attachaments/update'

/**
 * Update ticket attachament
 * @param {number} [id] ticket attachament id
 * @param {Attachament} data ticket attachament data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, data: Attachament, reqInfo: RequestInfo): Promise<Attachament> => {
  try {
    const payload: Attachament = await updateTicketsAttachaments(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Ticket attachament updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update ticket attachament (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EAU3',
      errorMessage: Errors.EAU3,
      errorDetails: error || error.message
    }
  }
}
