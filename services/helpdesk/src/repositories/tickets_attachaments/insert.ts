import database from '@utils/database'
import { Attachament } from '@models/attachament'
import selectTicketsAttachaments from '@repositories/tickets_attachaments/select'

/**
 * Insert ticket attachament in database
 * @param {Attachament} data ticket attachament data
 */
export default async (data: Attachament): Promise<Attachament> => {
  try {
    const databaseValue = await database.query({
      query: `
        INSERT INTO tbt_005_tickets_attachaments 
          (ticket_id, message_id, name, link, extention, size)
        VALUES 
          (?, ?, ?, ?, ?, ?)
      ;`,
      values: [
        data.ticket_id,
        data.message_id,
        data.name,
        data.link,
        data.extention,
        data.size
      ]
    })
    const ticketsAttachamentData: Attachament | Attachament[] = await selectTicketsAttachaments(databaseValue.insertId)
    if(Array.isArray(ticketsAttachamentData)){
      throw new Error('Cannot retrieve ticket attachament data')
    }
    return ticketsAttachamentData
  } catch (error) {
    throw error
  }
}
