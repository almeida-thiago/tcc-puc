import database from '@utils/database'
import { User } from '@models/user'
import selectUsers from '@repositories/users/select'

/**
 * Insert user in database
 * @param {User} data user data
 */
export default async (data: User): Promise<User> => {
  try {
    await database.query({
      query: `
        INSERT INTO tbu_001_users 
          (username, password, person_id, permission_id, google_id) 
        VALUES 
          (?, ?, ?, ?, ?)
      ;`,
      values: [
        data.username,
        data.password,
        data.person_id,
        data.permission_id,
        data.google_id
      ]
    })
    const userData: User | User[] = await selectUsers(data.username)
    if(Array.isArray(userData)){
      throw new Error('Cannot retrieve user data')
    }
    return userData
  } catch (error) {
    throw error
  }
}
