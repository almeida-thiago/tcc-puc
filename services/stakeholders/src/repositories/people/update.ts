import database from '@utils/database'
import { Person } from '@models/person'
import selectPeople from '@repositories/people/select'

/**
 * Update person from database
 * @param {string} id person id
 * @param {Person} id person data
 */
export default async (id: string, data: Person): Promise<Person> => {
  try {
    await database.query({
      query: `
        UPDATE tbp_001_people
        SET
          last_updated_at = ?,
          name = ?,
          status = ?
        WHERE 
          id = ? 
      ;`,
      values: [
        new Date(),
        data.name, 
        data.status,
        id
      ]
    })
    const peopleData: Person | Person[] = await selectPeople(id)
    if(Array.isArray(peopleData)){
      throw new Error('Cannot retrieve person data')
    }
    return peopleData
  } catch (error) {
    throw error
  }
}
