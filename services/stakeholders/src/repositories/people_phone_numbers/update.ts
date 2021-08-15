import database from '@utils/database'
import { PhoneNumber } from '@models/phone_number'
import selectPeoplePhoneNumbers from '@repositories/people_phone_numbers/select'

/**
 * Update person phone number
 * @param {number} id telephone id
 * @param {PhoneNumber} data telephone data
 */
export default async (id: number, data: PhoneNumber): Promise<PhoneNumber> => {
  const connection = await database.poolConnection()
  try {
    const databaseValue: PhoneNumber[] = await database.query({
      query: `
        SELECT * 
        FROM tbp_003_people_phone_numbers
        WHERE id = ?
      ;`,
      values: [id]
    }, connection)
    await database.query({
      query: `
        UPDATE tbp_003_people_phone_numbers
        SET
          last_updated_at = ?,
          phone_number = ?,
          is_primary = ?
        WHERE 
          id = ? 
      ;`,
      values: [
        new Date(),
        data.phone_number,
        data.is_primary,
        id
      ]
    }, connection)
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
          databaseValue[0].person_id
        ]
      }, connection)
    }
    connection.commit()
    const peoplePhoneNumbersData: PhoneNumber | PhoneNumber[] = await selectPeoplePhoneNumbers(id)
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
