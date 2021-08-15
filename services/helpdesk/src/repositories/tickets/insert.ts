import database from '@utils/database'
import { Ticket } from '@models/ticket'
import selectTicket from '@repositories/tickets/select'

/**
 * Insert ticket in database
 * @param {Ticket} data ticket data
 * @param {string} id ticket data
 */
export default async (data: Ticket, id: string): Promise<Ticket> => {
  try {
    const databaseValue = await database.query({
      query: `
        INSERT INTO tbt_001_tickets 
          (id, title, channel_id, type_id, departament_id, status_id, owner_id) 
        VALUES 
          (?, ?, ?, ?, ?, ?, ?)
      ;`,
      values: [
        id, 
        data.title,
        data.channel_id,
        data.type_id,
        data.departament_id,
        data.status_id,
        data.owner_id
      ]
    })
    const ticketData: Ticket | Ticket[] = await selectTicket(id)
    if(Array.isArray(ticketData)){
      throw new Error('Cannot retrieve ticket data')
    }
    return ticketData
  } catch (error) {
    throw error
  }
}
