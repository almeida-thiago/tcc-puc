import logger from '@utils/logger'
import selectPermissions from '@repositories/permissions/select'
import { RequestInfo } from '@models/request'
import { Permission } from '@models/permission'
import { Errors } from '@enums/errors'

/**
 * Read users permissions
 * @param {number} [id] permission id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number | null, reqInfo: RequestInfo): Promise<Permission | Permission[]> => {
  try {
    const payload: Permission | Permission[] = await selectPermissions(id)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `User permission read: ${id ? id : 'all'}`, reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on read user permission: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'EPR2',
      errorMessage: Errors.EPR2,
      errorDetails: error
    }
  }
}
