import database from '@utils/database'
import { Message } from '@models/message'
import selectTicketsMessages from '@repositories/tickets_messages/select'

/**
 * Insert ticket message in database
 * @param {Message} data ticket message data
 */
export default async (data: Message): Promise<Message> => {
  try {
    const databaseValue = await database.query({
      query: `
        INSERT INTO tbt_002_tickets_messages 
          (ticket_id, person_id, message) 
        VALUES 
          (?, ?, ?)
      ;`,
      values: [
        data.ticket_id,
        data.person_id,
        data.message
      ]
    })
    const ticketsMessagesData: Message | Message[] = await selectTicketsMessages(databaseValue.insertId)
    if (Array.isArray(ticketsMessagesData)) {
      throw new Error('Cannot retrieve ticket message data')
    }
    return ticketsMessagesData
  } catch (error) {
    throw error
  }
}
