import database from '@utils/database'
import { Ticket } from '@models/ticket'
import selectTicket from '@repositories/tickets/select'

/**
 * Update ticket from database
 * @param {string} id ticket id
 * @param {Ticket} data ticket data
 */
export default async (id: string, data: Ticket): Promise<Ticket> => {
  try {
    await database.query({
      query: `
        UPDATE tbt_001_tickets
        SET
          last_updated_at = ?,
          title = ?,
          channel_id = ?,
          type_id = ?,
          departament_id = ?,
          status_id = ?,
          owner_id = ?,
          agent_id = ?
        WHERE 
          id = ? 
      ;`,
      values: [
        new Date(),
        data.title,
        data.channel_id,
        data.type_id,
        data.departament_id,
        data.status_id,
        data.owner_id,
        data.agent_id,
        id
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
