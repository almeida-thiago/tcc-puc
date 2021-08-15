import database from '@utils/database'

/**
 * Delete person from database
 * @param {string} id person id
 */
export default async (id: string): Promise<void> => {
  const connection = await database.poolConnection()
  try {
    connection.beginTransaction()
    await database.query({
      query: `
        DELETE
        FROM tbp_003_people_phone_numbers
        WHERE person_id = ?
      ;`,
      values: [id]
    }, connection)
    await database.query({
      query: `
        DELETE
        FROM tbp_002_people_emails
        WHERE person_id = ?
      ;`,
      values: [id]
    }, connection)
    await database.query({
      query: `
        DELETE
        FROM tbp_001_people
        WHERE id = ?
      ;`,
      values: [id]
    }, connection)
    connection.commit()
  } catch (error) {
    connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}
