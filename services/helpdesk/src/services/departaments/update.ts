import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Departament } from '@models/departament'
import { Errors } from '@enums/errors'
import updateDepartaments from '@repositories/departaments/update'

/**
 * Update departament
 * @param {number} [id] departament id
 * @param {Departament} data departament data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, data: Departament, reqInfo: RequestInfo): Promise<Departament> => {
  try {
    const payload: Departament = await updateDepartaments(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Departament updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update departament (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EDU3',
      errorMessage: Errors.EDU3,
      errorDetails: error || error.message
    }
  }
}
