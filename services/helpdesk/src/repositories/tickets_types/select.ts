import database from '@utils/database'
import { Type } from '@models/type'

/**
 * Select ticket types from database
 * @param {number} [id] ticket type id
 */
export default async (id: number | null = null): Promise<Type | Type[] > => {
  try {
    if (id) {
      const data: Type[] = await database.query({
        query: `
          SELECT * 
          FROM tbt_004_tickets_types
          WHERE id = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else {
      const data: Type[] = await database.query({
        query: `
          SELECT *
          FROM tbt_004_tickets_types
        ;`})
        return data
      }
  } catch (error) {
    throw error
  }
}
