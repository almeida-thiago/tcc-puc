import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import logger from '@utils/logger'
import insertSignUpUsers from '@repositories/users/insert_sign_up'
import { RequestInfo } from '@models/request'
import { User, UserSignUp } from '@models/user'
import { Errors } from '@enums/errors'

/**
 * Sign-up new user
 * @param {UserSignUp} data sign-up user data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: UserSignUp, reqInfo: RequestInfo): Promise<User> => {
  try {
    const person_id: string = uuidv4()
    data.password = await hash(data.password, 10)
    const userData: User = await insertSignUpUsers(person_id, data)
    logger('info', `New user created: ${userData.username}`, reqInfo)
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
    logger('error', `Error on create new user (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EUC1',
      errorMessage: Errors.EUC1,
      errorDetails: error || error.message
    }
  }
}
