import database from '@utils/database'

/**
 * Delete ticket type from database
 * @param {number} id ticket type id
 */
export default async (id: number): Promise<void> => {
  try {
    await database.query({
      query: `
        DELETE
        FROM tbt_004_tickets_types
        WHERE id = ?
      ;`,
      values: [ id ]
    })
  } catch (error) {
    throw error
  }
}
