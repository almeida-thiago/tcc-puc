import database from '@utils/database'
import { Status } from '@models/status'
import selectTicketsStatus from '@repositories/tickets_status/select'

/**
 * Update tickets Status from database
 * @param {number} id tickets Status id
 * @param {Status} data ticket Status data
 */
export default async (id: number, data: Status): Promise<Status> => {
  try {
    await database.query({
      query: `
        UPDATE tbt_003_tickets_status
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
    const ticketsStatusData: Status | Status[] = await selectTicketsStatus(id)
    if (Array.isArray(ticketsStatusData)) {
      throw new Error('Cannot retrieve ticket status data')
    }
    return ticketsStatusData  } catch (error) {
    throw error
  }
}
