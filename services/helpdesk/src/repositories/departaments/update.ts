import database from '@utils/database'
import { Departament } from '@models/departament'
import selectDepartaments from '@repositories/departaments/select'

/**
 * Update departament from database
 * @param {number} id departament id
 * @param {Departament} data departament data
 */
export default async (id: number, data: Departament): Promise<any> => {
  try {
    await database.query({
      query: `
        UPDATE tbt_006_departaments
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
    const ticketsDepartamentsData: Departament | Departament[] = await selectDepartaments(id)
    if (Array.isArray(ticketsDepartamentsData)) {
      throw new Error('Cannot retrieve departament data')
    }
    return ticketsDepartamentsData
  } catch (error) {
    throw error
  }
}
