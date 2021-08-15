import logger from '@utils/logger'
import updatePermissions from '@repositories/permissions/update'
import { RequestInfo } from '@models/request'
import { Permission } from '@models/permission'
import { Errors } from '@enums/errors'

/**
 * Update user permission
 * @param {string} id permission id
 * @param {Permission} data permission data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string, data: Permission, reqInfo: RequestInfo): Promise<Permission> => {
  try {
    const payload: Permission = await updatePermissions(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `User permission updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update user persmission (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EPU3',
      errorMessage: Errors.EPU3,
      errorDetails: error || error.message
    }
  }
}
