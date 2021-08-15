import database from '@utils/database'
import { Channel } from '@models/channel'
import selectChannels from '@repositories/channels/select'

/**
 * Insert channel in database
 * @param {Channel} data channel data
 */
export default async (data: Channel): Promise<Channel> => {
  try {
    const databaseValue = await database.query({
      query: `
        INSERT INTO tbt_007_channels 
          (name) 
        VALUES 
          (?)
      ;`,
      values: [data.name]
    })
    const ticketschannelsData: Channel | Channel[] = await selectChannels(databaseValue.insertId)
    if(Array.isArray(ticketschannelsData)){
      throw new Error('Cannot retrieve channel data')
    }
    return ticketschannelsData 
  } catch (error) {
    throw error
  }
}
