import database from '@utils/database'
import { Person } from '@models/person'
import peopleSelect from '@repositories/people/select'

/**
 * Insert person in database
 * @param {Person} data person data
 * @param {string} id person data
 */
export default async (data: Person, id: string): Promise<Person> => {
  try {
    await database.query({
      query: `
      INSERT INTO tbp_001_people 
        (id, name) 
      VALUES 
        (?, ?)
      ;`,
      values: [
        id, 
        data.name
      ]
    })
    const peopleData: Person | Person[] = await peopleSelect(id)
    if(Array.isArray(peopleData)){
      throw new Error('Cannot retrieve person data')
    }
    return peopleData
  } catch (error) {
    throw error
  }
}
