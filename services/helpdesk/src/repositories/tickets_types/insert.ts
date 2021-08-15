import database from '@utils/database'
import { Type } from '@models/type'
import selectTicketsTypes from '@repositories/tickets_types/select'

/**
 * Insert ticket type in database
 * @param {Type} data ticket type data
 */
export default async (data: Type): Promise<Type> => {
  try {
    const databaseValue = await database.query({
      query: `
        INSERT INTO tbt_004_tickets_types 
          (name) 
        VALUES 
          (?)
      ;`,
      values: [data.name]
    })
    const ticketsTypesData: Type | Type[] = await selectTicketsTypes(databaseValue.insertId)
    if (Array.isArray(ticketsTypesData)) {
      throw new Error('Cannot retrieve ticket type data')
    }
    return ticketsTypesData
  } catch (error) {
    throw error
  }
}
