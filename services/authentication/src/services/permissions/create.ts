import logger from '@utils/logger'
import insertPermissions from '@repositories/permissions/insert'
import { RequestInfo } from '@models/request'
import { Permission } from '@models/permission'
import { Errors } from '@enums/errors'

/**
 * Create new user permission
 * @param {Permission} data user permission data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Permission, reqInfo: RequestInfo): Promise<Permission> => {
  try {
    const payload: Permission = await insertPermissions(data)
    logger('info', `New user permission created: ${data.name}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new user permission (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EPC1',
      errorMessage: Errors.EPC1,
      errorDetails: error || error.message
    }
  }
}
