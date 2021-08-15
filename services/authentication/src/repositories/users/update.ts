import database from '@utils/database'
import { User } from '@models/user'
import selectUsers from '@repositories/users/select'

/**
 * Update user from database
 * @param {string} id username
 * @param {User} id user data
 */
export default async (id: string, data: User): Promise<User> => {
  try {
    await database.query({
      query: `
        UPDATE tbu_001_users
        SET
          last_updated_at = ?,
          password = ?, 
          person_id = ?, 
          permission_id = ?,
          google_id = ?
        WHERE 
          username = ? 
      ;`,
      values: [
        new Date(),
        data.password,
        data.person_id,
        data.permission_id,
        data.google_id,
        id
      ]
    })
    const userData: User | User[] = await selectUsers(data.username)
    if(Array.isArray(userData)){
      throw new Error('Cannot retrieve user data')
    }
    return userData  } catch (error) {
    throw error
  }
}
