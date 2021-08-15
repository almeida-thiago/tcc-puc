import database from '@utils/database'
import { Status } from '@models/status'
import selectTicketsStatus from '@repositories/tickets_status/select'

/**
 * Insert status Status in database
 * @param {Status} data status Status data
 */
export default async (data: Status): Promise<Status> => {
  try {
    const databaseValue = await database.query({
      query: `
        INSERT INTO tbt_003_tickets_status 
          (name) 
        VALUES 
          (?)
      ;`,
      values: [data.name]
    })
    const ticketsStatusData: Status | Status[] = await selectTicketsStatus(databaseValue.insertId)
    if (Array.isArray(ticketsStatusData)) {
      throw new Error('Cannot retrieve ticket status data')
    }
    return ticketsStatusData
  } catch (error) {
    throw error
  }
}
