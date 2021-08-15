import database from '@utils/database'

/**
 * Delete user from database
 * @param {string} id username
 */
export default async (id: string): Promise<boolean> => {
  try {
    await database.query({
      query: `
        DELETE
        FROM tbu_001_users
        WHERE username = ?
      ;`,
      values: [ id ]
    })
    return true
  } catch (error) {
    throw error
  }
}
