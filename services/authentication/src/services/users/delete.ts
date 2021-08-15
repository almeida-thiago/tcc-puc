import logger from '@utils/logger'
import deleteUsers from '@repositories/users/delete'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'

/**
 * Delete user
 * @param {string} id username
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deleteUsers(id)
    logger('info', `User deleted: ${id}`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete user (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EUD4',
      errorMessage: Errors.EUD4,
      errorDetails: error || error.message
    }
  }
}
