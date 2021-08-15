import database from '@utils/database'
import { Departament } from '@models/departament'

/**
 * Select departaments from database
 * @param {number} [id] departament id
 */
export default async (id: number | null = null): Promise<Departament | Departament[] > => {
  try {
    if (id) {
      const data: Departament[] = await database.query({
        query: `
          SELECT * 
          FROM tbt_006_departaments
          WHERE id = ?
        ;`,
        values: [id]
      })
      return data[0]
    } else {
      const data: Departament[] = await database.query({
        query: `
          SELECT *
          FROM tbt_006_departaments
        ;`})
        return data
      }
  } catch (error) {
    throw error
  }
}
