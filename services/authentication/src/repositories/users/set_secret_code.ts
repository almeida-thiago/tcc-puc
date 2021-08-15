import database from '@utils/database'

/**
 * Set security code for username in database
 * @param {string} id username
 * @param {string | null} hash username
 */
export default async (id: string, hash: string | null): Promise<void> => {
  try {
    await database.query({
      query: `
        UPDATE tbu_001_users
        SET 
          last_updated_at = ?,
          secret_code = ?
        WHERE username = ?
      ;`,
      values: [ 
        new Date(),
        hash, 
        id 
      ]
    })
  } catch (error) {
    throw error
  }
}
