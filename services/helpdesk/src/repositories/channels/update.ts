import database from '@utils/database'
import { Channel } from '@models/channel'
import selectChannels from '@repositories/channels/select'

/**
 * Update channel from database
 * @param {number} id channel id
 * @param {Channel} data channel data
 */
export default async (id: number, data: Channel): Promise<any> => {
  try {
    await database.query({
      query: `
        UPDATE tbt_007_channels
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
    const ticketsChannelsData: Channel | Channel[] = await selectChannels(id)
    if (Array.isArray(ticketsChannelsData)) {
      throw new Error('Cannot retrieve channel data')
    }
    return ticketsChannelsData
  } catch (error) {
    throw error
  }
}
