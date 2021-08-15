import database from '@utils/database'
import { Email } from '@models/email'
import selectPeopleEmails from '@repositories/people_emails/select'

/**
 * Update person e-mail
 * @param {number} id e-mail id
 * @param {Email} data e-mail data
 */
export default async (id: number, data: Email): Promise<Email> => {
  const connection = await database.poolConnection()
  try {
    const databaseValue: Email[] = await database.query({
      query: `
        SELECT * 
        FROM tbp_002_people_emails
        WHERE id = ?
      ;`,
      values: [id]
    }, connection)
    await database.query({
      query: `
        UPDATE tbp_002_people_emails
        SET
          last_updated_at = ?,
          email = ?,
          is_primary = ?
        WHERE 
          id = ? 
      ;`,
      values: [
        new Date(),
        data.email,
        data.is_primary,
        id
      ]
    }, connection)
    if (data.is_primary) {
      await database.query({
        query: `
          UPDATE tbp_002_people_emails
          SET
            last_updated_at = ?,
            is_primary = 0
          WHERE 
            email <> ? 
            AND person_id = ?
        ;`,
        values: [
          new Date(),
          data.email,
          databaseValue[0].person_id
        ]
      }, connection)
    }
    connection.commit()
    const peopleEmailsData: Email | Email[] = await selectPeopleEmails(id)
    if (Array.isArray(peopleEmailsData)) {
      throw new Error('Cannot retrieve people e-mails data')
    }
    return peopleEmailsData
  } catch (error) {
    connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}
