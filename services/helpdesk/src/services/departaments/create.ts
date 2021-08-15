import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Departament } from '@models/departament'
import { Errors } from '@enums/errors'
import insertDepartaments from '@repositories/departaments/insert'

/**
 * Create new departament
 * @param {Departament} data departament data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Departament, reqInfo: RequestInfo): Promise<Departament> => {
  try {
    const payload: Departament = await insertDepartaments(data)
    logger('info', `New departament created`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new departament (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EDC1',
      errorMessage: Errors.EDC1,
      errorDetails: error || error.message
    }
  }
}
