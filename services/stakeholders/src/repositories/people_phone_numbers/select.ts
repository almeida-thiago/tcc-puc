import database from '@utils/database'
import { PhoneNumber } from '@models/phone_number'

/**
 * Select people phone numbers from database
 * @param {number} [id] telefone id
* @param {string} [person_id] person id
 */
export default async (id: number | null = null, person_id: string | null = null): Promise<PhoneNumber | PhoneNumber[]> => {
  try {
    if (person_id) {
      const data: PhoneNumber[] = await database.query({
        query: `
          SELECT * 
          FROM tbp_003_people_phone_numbers
          WHERE person_id = ?
        ;`,
        values: [person_id]
      })
      return data
    } else if (id) {
      const data: PhoneNumber[] = await database.query({
        query: `
          SELECT * 
          FROM tbp_003_people_phone_numbers
          WHERE id = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else {
      const data: PhoneNumber[] = await database.query({
        query: `
          SELECT *
          FROM tbp_003_people_phone_numbers
        ;`})
      return data
    }
  } catch (error) {
    throw error
  }
}
