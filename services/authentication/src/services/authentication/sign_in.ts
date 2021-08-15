import { compare } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { sign, decode } from 'jsonwebtoken'
import logger from '@utils/logger'
import { validateRecaptcha } from '@utils/security'
import { getTokenSecret } from '@utils/generals'
import selectUsers from '@repositories/users/select'
import setUsersLoginTries from '@repositories/users/set_login_tries'
import insertSignUp from '@repositories/users/insert_sign_up'
import { RequestInfo } from '@models/request'
import { User, UserSignUp } from '@models/user'
import { SignIn } from '@models/login'
import { Errors } from '@enums/errors'

/**
 * Login user
 * @param {SignIn} data user data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: SignIn, reqInfo: RequestInfo): Promise<{ token: string; }> => {
  try {
    const recaptchaIsValid: boolean = await validateRecaptcha(data.recaptchaToken!)
    if (!recaptchaIsValid && !data.service) {
      throw new Error('Recaptcha validation failed')
    }
    let getUser: User | User[] = await selectUsers(data.username)
    if (data.accessToken) {
      const googleUser: any = await loginWithGoogle(data.accessToken)
      getUser = await selectUsers(null, null, googleUser.google_id)
      if (!getUser) {
        const person_id: string = uuidv4()
        const createData: UserSignUp = {
          username: googleUser.google_id,
          name: googleUser.name,
          email: googleUser.email
        }
        await insertSignUp(person_id, createData, googleUser.google_id)
        getUser = await selectUsers(null, person_id)
      }
    }
    if (!getUser || Array.isArray(getUser)) {
      throw new Error(`User ${data.username} not exists`)
    }
    if (Number(getUser.login_tries) === 3 || !getUser.status) {
      throw new Error(`User ${data.username} is blocked`)
    }
    if (data.service && data.accessToken) {

    } else {
      const validPassword: boolean = await compare(data.password, getUser.password)
      if (!validPassword) {
        const loginTryNumber: number = Number(getUser.login_tries) + 1
        await setUsersLoginTries(loginTryNumber, data.username!)
        throw new Error('Invalid login data')
      }
      if (Number(getUser.login_tries) > 0) {
        await setUsersLoginTries(0, data.username!)
      }
    }
    const expiresIn: string = data.keep_conected ? '24h' : '15m'
    const tokenData: any = {
      person_id: getUser.person_id,
      person_name: getUser.person_name,
      permission_id: getUser.permission_id,
      permission_level: getUser.permission_level,
      permission_name: getUser.person_name,
    }
    const token: string = await sign(tokenData, getTokenSecret(), { expiresIn })
    logger('info', `User login: ${data.username}`, reqInfo)
    return { token }
  } catch (error) {
    logger('error', `Error on login user (${error})`, reqInfo)
    throw {
      httpCode: 401,
      errorCode: 'EAL1',
      errorMessage: Errors.EAL1,
      errorDetails: error || error.message
    }
  }
}

/**
 * login with Google
 * @param {string} accessToken access token
 */
const loginWithGoogle = (accessToken: string): any => {
  try {
    const { sub, email, name } = decode(accessToken)
    return { google_id: sub, email, name }
  } catch (error) {
    throw error
  }
}
