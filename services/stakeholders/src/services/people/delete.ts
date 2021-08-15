import logger from '@utils/logger'
import deletePeople from '@repositories/people/delete'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'

/**
 * Delete person
 * @param {string} id person id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deletePeople(id)
    logger('info', `Person deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete person (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EPD4',
      errorMessage: Errors.EPD4,
      errorDetails: error || error.message
    }
  }
}
