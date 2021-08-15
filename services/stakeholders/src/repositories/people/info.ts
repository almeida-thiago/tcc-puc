import database from '@utils/database'

/**
 * Select people info from database
 */
export default async (): Promise<any> => {
  try {
    const data: any[] = await database.query({
      query: `
        SELECT COUNT(*) AS people_count
        FROM tbp_001_people AS people
      ;`})
    return data[0]
  } catch (error) {
    throw error
  }
}
