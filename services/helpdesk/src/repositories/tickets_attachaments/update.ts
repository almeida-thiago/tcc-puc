import database from '@utils/database'
import { Attachament } from '@models/attachament'
import selectTicketsAttachaments from '@repositories/tickets_attachaments/select'

/**
 * Update tickets attachament from database
 * @param {number} id tickets attachament id
 * @param {Attachament} data ticket attachament data
 */
export default async (id: number, data: Attachament): Promise<Attachament> => {
  try {
    await database.query({
      query: `
        UPDATE tbt_005_tickets_attachaments
        SET
          ticket_id = ?,
          message_id = ?,
          name = ?,
          link = ?,
          extention = ?,
          size = ?
        WHERE 
          id = ? 
      ;`,
      values: [
        data.ticket_id,
        data.message_id,
        data.name,
        data.link,
        data.extention,
        data.size,
        id
      ]
    })
    const ticketsAttachamentData: Attachament | Attachament[] = await selectTicketsAttachaments(id)
    if(Array.isArray(ticketsAttachamentData)){
      throw new Error('Cannot retrieve ticket attachament data')
    }
    return ticketsAttachamentData 
   } catch (error) {
    throw error
  }
}
