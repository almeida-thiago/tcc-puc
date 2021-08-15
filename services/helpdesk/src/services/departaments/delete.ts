import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'
import deleteDepartaments from '@repositories/departaments/delete'

/**
 * Delete departament
 * @param {number} id departament id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deleteDepartaments(id)
    logger('info', `Departament deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete departament (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EDD4',
      errorMessage: Errors.EDD4,
      errorDetails: error || error.message
    }
  }
}
