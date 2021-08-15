import database from '@utils/database'
import { User, UserSignUp } from '@models/user'
import selectUsers from '@repositories/users/select'

/**
 * Insert sign-up user in database
 * @param {UserSignUp} data user data
 */
export default async (person_id: string, data: UserSignUp, google_id: string | null = null): Promise<User> => {
  const connection = await database.poolConnection()
  try {
    connection.beginTransaction()
    await database.query({
      query: `
      INSERT INTO tbp_001_people 
        (id, name) 
      VALUES 
        (?, ?)
    ;`,
      values: [
        person_id,
        data.name
      ]
    }, connection)
    await database.query({
      query: `
        INSERT INTO tbp_002_people_emails 
          (email, person_id, is_primary) 
        VALUES 
          (?, ?, 1)
      ;`,
      values: [
        data.email,
        person_id
      ]
    }, connection)
    if (data.phone_number) {
      await database.query({
        query: `
        INSERT INTO tbp_003_people_phone_numbers 
          (phone_number, person_id, is_primary) 
        VALUES 
          (?, ?, 1)
      ;`,
        values: [
          data.phone_number,
          person_id
        ]
      }, connection)
    }
    await database.query({
      query: `
      INSERT INTO tbu_001_users 
        (username, password, person_id, permission_id, google_id) 
      VALUES 
        (?, ?, ?, 5, ?)
    ;`,
      values: [
        data.username,
        data.password,
        person_id,
        google_id
      ]
    }, connection)

    connection.commit()
    const userData: User | User[] = await selectUsers(data.username)
    if (Array.isArray(userData)) {
      throw new Error('Cannot retrieve user data')
    }
    return userData
  } catch (error) {
    throw error
  }
}
