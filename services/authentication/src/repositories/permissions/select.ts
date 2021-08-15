import database from '@utils/database'
import { Permission } from '@models/permission'

/**
 * Select user permissions from database
 * @param {number} [id] permission id
 */
export default async (id: number | null = null): Promise<Permission | Permission[] > => {
  try {
    if (id) {
      const data: Permission[] = await database.query({
        query: `
          SELECT *
          FROM tbu_002_users_permissions
          WHERE id = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else {
      const data: Permission[] = await database.query({
        query: `
          SELECT *
          FROM tbu_002_users_permissions
        ;`})
        return data
      }
  } catch (error) {
    throw error
  }
}
