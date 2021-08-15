import database from '@utils/database'
import { Email } from '@models/email'

/**
 * Select people e-mails from database
 * @param {number} [id] e-mail id
 * @param {string} [person_id] person id
 */
export default async (id: number | null = null, person_id: string | null = null): Promise<Email | Email[]> => {
  try {
    if (person_id) {
      const data: Email[] = await database.query({
        query: `
          SELECT * 
          FROM tbp_002_people_emails
          WHERE person_id = ?
        ;`,
        values: [person_id]
      })
      return data
    } else if (id) {
      const data: Email[] = await database.query({
        query: `
          SELECT * 
          FROM tbp_002_people_emails
          WHERE id = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else {
      const data: Email[] = await database.query({
        query: `
          SELECT *
          FROM tbp_002_people_emails
        ;`})
      return data
    }
  } catch (error) {
    throw error
  }
}
