import logger from '@utils/logger'
import updatePeople from '@repositories/people/update'
import updatePeopleEmails from '@repositories/people_emails/update'
import updatePeoplePhoneNumbers from '@repositories/people_phone_numbers/update'
import { RequestInfo } from '@models/request'
import { Person } from '@models/person'
import { Errors } from '@enums/errors'

/**
 * Update person
 * @param {string} [id] person id
 * @param {Person} data person data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: string, data: Person, reqInfo: RequestInfo): Promise<Person> => {
  try {
    const payload: Person = await updatePeople(id, data)
    if (!payload) {
      throw new Error(`Id ${id} not found in database`)
    }
    if (data.email) {
      await updatePeopleEmails(data.email_id!, {
        email: data.email,
        is_primary: true
      })
    }
    if (data.phone_number) {
      await updatePeoplePhoneNumbers(data.phone_number_id!, {
        phone_number: String(data.phone_number),
        is_primary: true
      })
    }
    logger('info', `Person updated: ${id}`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on update person (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EPU3',
      errorMessage: Errors.EPU3,
      errorDetails: error || error.message
    }
  }
}
