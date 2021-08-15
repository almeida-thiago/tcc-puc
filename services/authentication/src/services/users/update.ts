import { hash } from 'bcrypt'
import logger from '@utils/logger'
import updateUsers from '@repositories/users/update'
import { RequestInfo } from '@models/request'
import { User } from '@models/user'
import { Errors } from '@enums/errors'

/**
 * Update user
 * @param {string} id username
 * @param {User} data user data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string, data: User, reqInfo: RequestInfo): Promise<User> => {
  try {
    if (data.password) {
      data.password = await hash(data.password, 10)
    }
    const userData: User = await updateUsers(id, data)
    if (!userData) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `User updated: ${id}`, reqInfo)
    const payload: User = {
      username: userData.username,
      person_id: userData.person_id,
      person_name: userData.person_name,
      permission_id: userData.permission_id,
      permission_name: userData.person_name,
      status: userData.status,
      created_at: userData.created_at,
      last_updated_at: userData.last_updated_at
    }
    return payload
  } catch (error) {
    logger('error', `Error on update user (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EUU3',
      errorMessage: Errors.EUU3,
      errorDetails: error || error.message
    }
  }
}
