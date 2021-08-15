import logger from '@utils/logger'
import selectUsers from '@repositories/users/select'
import { RequestInfo } from '@models/request'
import { User } from '@models/user'
import { Errors } from '@enums/errors'

/**
 * Read users
 * @param {string} [id] username
 * @param {string} [person_id] person id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string | null, person_id: string | null, reqInfo: RequestInfo): Promise<User | User[]> => {
  try {
    const userData: User | User[] = await selectUsers(id, person_id)
    if (!userData) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `User read: ${id ? id : 'all'}`, reqInfo)
    const payload: User | User[] = Array.isArray(userData) ?
      userData.map(item => ({
        username: item.username,
        person_id: item.person_id,
        person_name: item.person_name,
        permission_id: item.permission_id,
        permission_name: item.permission_name,
        status: item.status,
        created_at: item.created_at,
        last_updated_at: item.last_updated_at
      })) : {
        username: userData.username,
        person_id: userData.person_id,
        person_name: userData.person_name,
        permission_id: userData.permission_id,
        permission_name: userData.permission_name,
        status: userData.status,
        created_at: userData.created_at,
        last_updated_at: userData.last_updated_at
      }
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on user read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'EUR2',
      errorMessage: Errors.EUR2,
      errorDetails: error
    }
  }
}
