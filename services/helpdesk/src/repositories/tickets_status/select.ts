import database from '@utils/database'
import { Status } from '@models/status'

/**
 * Select ticket status from database
 * @param {number} [id] ticket status id
 */
export default async (id: number | null = null): Promise<Status | Status[] > => {
  try {
    if (id) {
      const data: Status[] = await database.query({
        query: `
          SELECT * 
          FROM tbt_003_tickets_status
          WHERE id = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else {
      const data: Status[] = await database.query({
        query: `
          SELECT *
          FROM tbt_003_tickets_status
        ;`})
        return data
      }
  } catch (error) {
    throw error
  }
}
