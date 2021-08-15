import database from '@utils/database'

/**
 * Change password
 * @param {string} id username
 * @param {string} passwordHash password hash
 */
 export default async (id: string, passwordHash: string): Promise<void> => {
  try {
    await database.query({
      query: `
        UPDATE tbu_001_users
        SET 
          last_updated_at = ?,
          password = ?
        WHERE username = ?
      ;`,
      values: [
        new Date(), 
        passwordHash, 
        id 
      ]
    })
  } catch (error) {
    throw error
  }
}
