import database from '@utils/database'

/**
 * Select person from database
 * @param {string} [id] username
 */
export default async (id: string | null = null, person_id: string | null = null): Promise<any> => {
  try {
    const data: any[] = await database.query({
      query: `
          SELECT 
            people.name AS name,
            emails.email,
            phone_numbers.phone_number
          FROM tbu_001_users AS users
          LEFT JOIN tbp_001_people AS people ON people.id = users.person_id
          LEFT JOIN tbp_002_people_emails AS emails ON people.id = emails.person_id AND emails.is_primary = 1
          LEFT JOIN tbp_003_people_phone_numbers AS phone_numbers ON people.id = phone_numbers.person_id AND phone_numbers.is_primary = 1
          WHERE users.username = ?
        ;`,
      values: [id]
    })
    return data[0]
  } catch (error) {
    throw error
  }
}
