import database from '@utils/database'

/**
 * Delete channel from database
 * @param {number} id channel id
 */
export default async (id: number): Promise<void> => {
  try {
    await database.query({
      query: `
        DELETE
        FROM tbt_007_channels
        WHERE id = ?
      ;`,
      values: [ id ]
    })
  } catch (error) {
    throw error
  }
}
