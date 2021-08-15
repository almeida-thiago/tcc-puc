import database from '@utils/database'
import { Departament } from '@models/departament'
import selectDepartaments from '@repositories/departaments/select'

/**
 * Insert departament in database
 * @param {Departament} data departament data
 */
export default async (data: Departament): Promise<Departament> => {
  try {
    const databaseValue = await database.query({
      query: `
        INSERT INTO tbt_006_departaments 
          (name) 
        VALUES 
          (?)
      ;`,
      values: [data.name]
    })
    const ticketsDepartamentsData: Departament | Departament[] = await selectDepartaments(databaseValue.insertId)
    if(Array.isArray(ticketsDepartamentsData)){
      throw new Error('Cannot retrieve departament data')
    }
    return ticketsDepartamentsData 
  } catch (error) {
    throw error
  }
}
