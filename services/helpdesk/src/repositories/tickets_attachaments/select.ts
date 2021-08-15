import database from '@utils/database'
import { Attachament } from '@models/attachament'

/**
 * Select ticket attachaments from database
 * @param {number} [id] ticket attachament id
 * @param {string} [ticket_id] ticket id
 */
export default async (id: number | null = null, ticket_id: string | null = null) : Promise<Attachament | Attachament[] > => {
  try {
    if (ticket_id) {
      const data: Attachament[] = await database.query({
        query: `
          SELECT * 
          FROM tbt_005_tickets_attachaments
          WHERE ticket_id = ?
        ;`,
        values: [ticket_id]
      })
      return data
    } else if (id) {
      const data: Attachament[] = await database.query({
        query: `
          SELECT * 
          FROM tbt_005_tickets_attachaments
          WHERE id = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else {
      const data: Attachament[] = await database.query({
        query: `
          SELECT *
          FROM tbt_005_tickets_attachaments
        ;`})
        return data
      }
  } catch (error) {
    throw error
  }
}
