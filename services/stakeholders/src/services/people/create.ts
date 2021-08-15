import { v4 as uuidv4 } from 'uuid'
import logger from '@utils/logger'
import insertPeople from '@repositories/people/insert'
import insertPeopleEmails from '@repositories/people_emails/insert'
import insertPeoplePhoneNumbers from '@repositories/people_phone_numbers/insert'
import { RequestInfo } from '@models/request'
import { Person } from '@models/person'
import { Errors } from '@enums/errors'

/**
 * Create new person
 * @param {Person} data person data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Person, reqInfo: RequestInfo): Promise<Person> => {
  try {
    const id: string = uuidv4()
    const payload: Person = await insertPeople(data, id)
    if (data.email) {
      await insertPeopleEmails({
        email: data.email,
        person_id: payload.id!,
        is_primary: true
      })
    }
    if (data.phone_number) {
      await insertPeoplePhoneNumbers({
        phone_number: String(data.phone_number),
        person_id: payload.id!,
        is_primary: true
      })
    }
    logger('info', `New person created`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new person (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EPC1',
      errorMessage: Errors.EPC1,
      errorDetails: error || error.message
    }
  }
}
