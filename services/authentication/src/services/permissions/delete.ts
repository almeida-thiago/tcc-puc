import logger from '@utils/logger'
import deletePermissions from '@repositories/permissions/delete'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'

/**
 * Delete user permission
 * @param {string} id permission id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deletePermissions(id)
    logger('info', `User permission deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete user permission (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EPD4',
      errorMessage: Errors.EPD4,
      errorDetails: error || error.message
    }
  }
}
