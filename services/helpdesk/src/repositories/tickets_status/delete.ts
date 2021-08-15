import database from '@utils/database'

/**
 * Delete ticket status from database
 * @param {number} id ticket status id
 */
export default async (id: number): Promise<void> => {
  try {
    await database.query({
      query: `
        DELETE
        FROM tbt_003_tickets_status
        WHERE id = ?
      ;`,
      values: [ id ]
    })
  } catch (error) {
    throw error
  }
}
