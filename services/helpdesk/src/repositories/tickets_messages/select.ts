import database from '@utils/database'
import { Message } from '@models/message'

/**
 * Select ticket messages from database
 * @param {number} [id] ticket message id
 * @param {string} [ticket_id] ticket id
*/
export default async (id: number | null = null, ticket_id: string | null = null): Promise<Message | Message[] > => {
  try {
    if (ticket_id) {
      const data: Message[] = await database.query({
        query: `
          SELECT
            messages.*,
            person.name AS person_name
          FROM tbt_002_tickets_messages AS messages
          LEFT JOIN tbp_001_people AS person ON messages.person_id = person.id
          WHERE messages.ticket_id = ?
        ;`,
        values: [ticket_id]
      })
      return data
    } else if (id) {
      const data: Message[] = await database.query({
        query: `
          SELECT
            messages.*,
            person.name AS person_name
          FROM tbt_002_tickets_messages AS messages
          LEFT JOIN tbp_001_people AS person ON messages.person_id = person.id
          WHERE messages.id = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else {
      const data: Message[] = await database.query({
        query: `
          SELECT
            messages.*,
            person.name AS person_name
          FROM tbt_002_tickets_messages AS messages
          LEFT JOIN tbp_001_people AS person ON messages.person_id = person.id 
        ;`})
        return data
      }
  } catch (error) {
    throw error
  }
}
