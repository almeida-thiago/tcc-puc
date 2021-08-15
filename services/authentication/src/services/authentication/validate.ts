import { verify } from 'jsonwebtoken'
import logger from '@utils/logger'
import { getTokenSecret } from '@utils/generals'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'

/**
 * Validate authentication token
 * @param {string} [token] token
 * @param {number} [grant] token
 * @param {string} [personId] person id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (token: string | null, number: number, personId: string | null, reqInfo: RequestInfo): Promise<boolean> => {
  try {
    if (!token) {
      throw new Error('token not provided')
    }
    const splitToken: string[] = token.split(' ')
    const tokenData: any = await verify(splitToken[1], getTokenSecret())
    if (parseInt(tokenData.permission_level) > number && !personId) {
      throw new Error('permission access denied')
    }
    logger('info', `Authentication token validated`, reqInfo)
    return true
  } catch (error) {
    logger('error', `Error on validate token (${error})`, reqInfo)
    throw {
      httpCode: 401,
      errorCode: 'EAV3',
      errorMessage: Errors.EAV3,
      errorDetails: error || error.message
    }
  }
}
