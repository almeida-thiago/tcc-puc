import database from '@utils/database'
import { Type } from '@models/type'
import selectTicketsTypes from '@repositories/tickets_types/select'

/**
 * Update tickets type from database
 * @param {number} id tickets type id
 * @param {Type} data ticket type data
 */
export default async (id: number, data: Type): Promise<Type> => {
  try {
    await database.query({
      query: `
        UPDATE tbt_004_tickets_types
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
    const ticketsTypesData: Type | Type[] = await selectTicketsTypes(id)
    if (Array.isArray(ticketsTypesData)) {
      throw new Error('Cannot retrieve ticket type data')
    }
    return ticketsTypesData  } catch (error) {
    throw error
  }
}
