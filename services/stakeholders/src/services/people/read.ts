import logger from '@utils/logger'
import selectPeople from '@repositories/people/select'
import { RequestInfo } from '@models/request'
import { Person } from '@models/person'
import { Errors } from '@enums/errors'

/**
 * Read people
 * @param {string} [id] person id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string, reqInfo: RequestInfo): Promise<Person | Person[]> => {
  try {
    const payload: Person | Person[] = await selectPeople(id)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    logger('info', `Person read: ${id ? id : 'all'}`, reqInfo)
    return payload
  } catch (error) {
    error = error || error.message
    logger('error', `Error on people read: ${error}`, reqInfo)
    throw {
      httpCode: 404,
      errorCode: 'EPR2',
      errorMessage: Errors.EPR2,
      errorDetails: error
    }
  }
}
