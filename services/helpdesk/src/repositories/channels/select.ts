import database from '@utils/database'
import { Channel } from '@models/channel'

/**
 * Select channels from database
 * @param {number} [id] channel id
 */
export default async (id: number | null = null): Promise<Channel | Channel[] > => {
  try {
    if (id) {
      const data: Channel[] = await database.query({
        query: `
          SELECT * 
          FROM tbt_007_channels
          WHERE id = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else {
      const data: Channel[] = await database.query({
        query: `
          SELECT *
          FROM tbt_007_channels
        ;`})
        return data
      }
  } catch (error) {
    throw error
  }
}
