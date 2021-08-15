import database from '@utils/database'
import { User } from '@models/user'

/**
 * Select user from database
 * @param {string} [id] username
 * @param {string} [person_id] person id
 * @param {string} [google_id] google id
 */
export default async (id: string | null = null, person_id: string | null = null, google_id: string | null = null,): Promise<User | User[]> => {
  try {
    if (person_id) {
      const data: User[] = await database.query({
        query: `
          SELECT 
            users.*,
            permission.name AS permission_name,
            permission.level AS permission_level,
            people.name AS person_name
          FROM tbu_001_users AS users
          LEFT JOIN tbu_002_users_permissions AS permission ON permission.id = users.permission_id
          LEFT JOIN tbp_001_people AS people ON people.id = users.person_id
          WHERE users.person_id = ?
        ;`,
        values: [person_id]
      })
      return data[0]
    } else if (id) {
      const data: User[] = await database.query({
        query: `
          SELECT 
            users.*,
            permission.name AS permission_name,
            permission.level AS permission_level,
            people.name AS person_name
          FROM tbu_001_users AS users
          LEFT JOIN tbu_002_users_permissions AS permission ON permission.id = users.permission_id
          LEFT JOIN tbp_001_people AS people ON people.id = users.person_id
          WHERE users.username = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else if (google_id) {
      const data: User[] = await database.query({
        query: `
          SELECT 
            users.*,
            permission.name AS permission_name,
            permission.level AS permission_level,
            people.name AS person_name
          FROM tbu_001_users AS users
          LEFT JOIN tbu_002_users_permissions AS permission ON permission.id = users.permission_id
          LEFT JOIN tbp_001_people AS people ON people.id = users.person_id
          WHERE users.google_id = ?
        ;`,
        values: [google_id]
      })
      return data[0]
    } else {
      const data: User[] = await database.query({
        query: `
          SELECT 
            users.*,
            permission.name AS permission_name,
            permission.level AS permission_level,
            people.name AS person_name
          FROM tbu_001_users AS users
          LEFT JOIN tbu_002_users_permissions AS permission ON permission.id = users.permission_id
          LEFT JOIN tbp_001_people AS people ON people.id = users.person_id
        ;`})
      return data
    }
  } catch (error) {
    throw error
  }
}
