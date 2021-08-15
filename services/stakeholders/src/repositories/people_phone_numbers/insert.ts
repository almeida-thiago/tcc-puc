import database from '@utils/database'
import { PhoneNumber } from '@models/phone_number'
import  selectPeoplePhoneNumbers  from '@repositories/people_phone_numbers/select'

/**
 * Insert person phone numberin database
 * @param {PhoneNumber} data phone number data
 */
export default async (data: PhoneNumber): Promise<PhoneNumber> => {
  const connection = await database.poolConnection()
  try {
    connection.beginTransaction()
    const databaseValue = await database.query({
      query: `
        INSERT INTO tbp_003_people_phone_numbers 
          (phone_number, person_id, is_primary) 
        VALUES 
          (?, ?, ?)
      ;`,
      values: [
        data.phone_number,
        data.person_id,
        (data.is_primary ? 1 : 0)
      ]
    },connection)
    if (data.is_primary) {
      await database.query({
        query: `
          UPDATE tbp_003_people_phone_numbers
          SET
            last_updated_at = ?,
            is_primary = 0
          WHERE 
            phone_number <> ? 
            AND person_id = ?
        ;`,
        values: [
          new Date(),
          data.phone_number,
          data.person_id
        ]
      }, connection)
    }
    connection.commit()
    const peoplePhoneNumbersData: PhoneNumber | PhoneNumber[] = await selectPeoplePhoneNumbers(databaseValue.insertId)
    if(Array.isArray(peoplePhoneNumbersData)){
      throw new Error('Cannot retrieve people phone number data')
    }
    return peoplePhoneNumbersData
  } catch (error) {
    connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}
