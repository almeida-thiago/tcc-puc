import database from '@utils/database'

/**
 * Delete ticket from database
 * @param {string} id ticket id
 */
export default async (id: string): Promise<void> => {
  const connection = await database.poolConnection()
  try {
    connection.beginTransaction()
    await database.query({
      query: `
        DELETE
        FROM tbt_002_tickets_messages
        WHERE ticket_id = ?
      ;`,
      values: [id]
    }, connection)
    await database.query({
      query: `
        DELETE
        FROM tbt_005_tickets_attachaments
        WHERE ticket_id = ?
      ;`,
      values: [id]
    }, connection)
    await database.query({
      query: `
        DELETE
        FROM tbt_001_tickets
        WHERE id = ?
      ;`,
      values: [id]
    }, connection)
    connection.commit()
    connection.release()
  } catch (error) {
    connection.rollback()
    connection.release()
    throw error
  }
}
