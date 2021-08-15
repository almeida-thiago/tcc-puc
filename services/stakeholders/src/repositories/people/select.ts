import database from '@utils/database'
import { Person } from '@models/person'

/**
 * Select people from database
 * @param {string} [id] people id
 */
export default async (id: string | null = null): Promise<Person | Person[] > => {
  try {
    if (id) {
      const data: Person[] = await database.query({
        query: `
          SELECT 
            people.*,
            emails.id AS email_id,
            emails.email,
            phone_numbers.id AS phone_number_id,
            phone_numbers.phone_number
          FROM tbp_001_people AS people
          LEFT JOIN tbp_002_people_emails AS emails ON people.id = emails.person_id AND emails.is_primary = 1
          LEFT JOIN tbp_003_people_phone_numbers AS phone_numbers ON people.id = phone_numbers.person_id AND phone_numbers.is_primary = 1
          WHERE people.id = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else {
      const data: Person[] = await database.query({
        query: `
          SELECT 
            people.*,
            emails.id AS email_id,
            emails.email,
            phone_numbers.id AS phone_number_id,
            phone_numbers.phone_number
          FROM tbp_001_people AS people
          LEFT JOIN tbp_002_people_emails AS emails ON people.id = emails.person_id AND emails.is_primary = 1
          LEFT JOIN tbp_003_people_phone_numbers AS phone_numbers ON people.id = phone_numbers.person_id AND phone_numbers.is_primary = 1
        ;`})
        return data
      }
  } catch (error) {
    throw error
  }
}
