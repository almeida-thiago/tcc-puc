import database from '@utils/database'

/**
 * Delete ticket message from database
 * @param {number} id ticket message id
 */
export default async (id: number): Promise<void> => {
  try {
    await database.query({
      query: `
        DELETE
        FROM tbt_002_tickets_messages
        WHERE id = ?
      ;`,
      values: [ id ]
    })
  } catch (error) {
    throw error
  }
}
