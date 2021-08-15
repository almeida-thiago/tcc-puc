import database from '@utils/database'

/**
 * Delete person e-mail from database
 * @param {number} id e-mail id
 */
export default async (id: number): Promise<void> => {
  try {
    await database.query({
      query: `
        DELETE
        FROM tbp_002_people_emails
        WHERE id = ?
      ;`,
      values: [id]
    })
  } catch (error) {
    throw error
  }
}
