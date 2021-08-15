import database from '@utils/database'

/**
 * Delete person phone number from database
 * @param {number} id telephone id
 */
export default async (id: number): Promise<void> => {
  try {
    await database.query({
      query: `
        DELETE
        FROM tbp_003_people_phone_numbers
        WHERE id = ?
      ;`,
      values: [id]
    })
  } catch (error) {
    throw error
  }
}
