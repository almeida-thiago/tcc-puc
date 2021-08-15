import { compare, hash } from 'bcrypt'
import logger from '@utils/logger'
import { validateRecaptcha } from '@utils/security'
import selectUsers from '@repositories/users/select'
import setUsersSecretCode from '@repositories/users/set_secret_code'
import changeUsersPassword from '@repositories/users/change_password'
import { RequestInfo } from '@models/request'
import { User } from '@models/user'
import { ChangePassword } from '@models/password'
import { Errors } from '@enums/errors'

/**
 * Create new user
 * @param {ChangePassword} data user data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: ChangePassword, reqInfo: RequestInfo): Promise<null> => {
  try {
    const recaptchaIsValid: boolean = await validateRecaptcha(data.recaptchaToken!)
    if(!recaptchaIsValid) {
      throw new Error('Recaptcha validation failed')
    }
    const getUser: User | User[] = await selectUsers(data.username)
    if (!getUser || Array.isArray(getUser)) {
      throw new Error(`User ${data.username} not exists`)
    }
    const validSecretCode: boolean = await compare(data.secret_code, getUser.secret_code)
    if (!validSecretCode) {
      throw new Error('Invalid code')
    }
    const passwordHash: string = await hash(data.password, 10)
    await setUsersSecretCode(data.username, null)
    await changeUsersPassword(data.username, passwordHash)
    logger('info', `Password changed`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on change password (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ERC2',
      errorMessage: Errors.ERC2,
      errorDetails: error || error.message
    }
  }
}
