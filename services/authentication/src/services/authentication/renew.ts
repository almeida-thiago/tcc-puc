import { verify, sign } from 'jsonwebtoken'
import logger from '@utils/logger'
import { getTokenSecret } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'

/**
 * Renew authentication token
 * @param {string | null} token token
 * @param {RequestInfo} reqInfo request info data
 */
export default async (token: string | null, reqInfo: RequestInfo): Promise<{ token: string }> => {
  try {
    if (!token) {
      throw new Error('token not provided')
    }
    const splitToken: string[] = token.split(' ')
    const tokenData: any = await verify(splitToken[1], getTokenSecret())
    delete tokenData.iat
    delete tokenData.exp
    const newToken: string = await sign(tokenData, getTokenSecret(), { expiresIn: '15m' })
    logger('info', `Autentication token renewed`, reqInfo)
    return { token: newToken }
  } catch (error) {
    logger('error', `Error on renew token (${error})`, reqInfo)
    throw {
      httpCode: 401,
      errorCode: 'EAR2',
      errorMessage: Errors.EAR2,
      errorDetails: error || error.message
    }
  }
}
