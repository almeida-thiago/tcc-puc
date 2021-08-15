import database from '@utils/database'

/**
 * Delete user permission from database
 * @param {string} id permission id
 */
export default async (id: string): Promise<void> => {
  try {
    await database.query({
      query: `
        DELETE
        FROM tbu_002_users_permissions
        WHERE id = ?
      ;`,
      values: [ id ]
    })
  } catch (error) {
    throw error
  }
}
