import database from '@utils/database'

/**
 * Get user data from database
 * @param {number} loginTries login tries
 * @param {string} id username
 */
export default async (loginTries: number, id: string): Promise<void> => {
  try {
    await database.query({
      query: `
      UPDATE tbu_001_users
      SET
        last_updated_at = ?, 
        login_tries = ?
      WHERE username = ? 
    ;`,
    values: [
      new Date(),
      loginTries,
      id
    ]
  });
  } catch (error) {
    throw error
  }
}
