import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Departament } from '@models/departament'
import { Errors } from '@enums/errors'
import selectDepartaments from '@repositories/departaments/select'

/**
 * Read departament
 * @param {number} [id] departament id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number | null, reqInfo: RequestInfo): Promise<Departament | Departament[]> => {
  try {
    const payload: Departament | Departament[] = await selectDepartaments(id)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Departaments read: ${id ? id : 'all'}`, reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on departaments read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'EDR2',
      errorMessage: Errors.EDR2,
      errorDetails: error
    }
  }
}
