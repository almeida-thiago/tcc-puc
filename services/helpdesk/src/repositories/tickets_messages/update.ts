import database from '@utils/database'
import { Message } from '@models/message'
import selectTicketsMessages from '@repositories/tickets_messages/select'

/**
 * Update tickets message from database
 * @param {number} id tickets message id
 * @param {Message} data ticket message data
 */
export default async (id: number, data: Message): Promise<Message> => {
  try {
    await database.query({
      query: `
        UPDATE tbt_002_tickets_messages
        SET
          ticket_id = ?,
          person_id = ?,
          message = ?
        WHERE 
          id = ? 
      ;`,
      values: [
        data.ticket_id,
        data.person_id,
        data.message,
        id
      ]
    })
    const ticketsMessagesData: Message | Message[] = await selectTicketsMessages(id)
    if (Array.isArray(ticketsMessagesData)) {
      throw new Error('Cannot retrieve ticket message data')
    }
    return ticketsMessagesData
  } catch (error) {
    throw error
  }
}
