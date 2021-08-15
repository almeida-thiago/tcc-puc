import database from '@utils/database'

/**
 * Delete ticket attachament from database
 * @param {number} id ticket attachament id
 */
export default async (id: number): Promise<void> => {
  try {
    await database.query({
      query: `
        DELETE
        FROM tbt_005_tickets_attachaments
        WHERE id = ?
      ;`,
      values: [ id ]
    })    
  } catch (error) {
    throw error
  }
}
