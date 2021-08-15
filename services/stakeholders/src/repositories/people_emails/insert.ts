import database from '@utils/database'
import { Email } from '@models/email'
import selectPeopleEmails  from '@repositories/people_emails/select'

/**
 * Insert person e-mail in database
 * @param {Email} data email data
 */
export default async (data: Email): Promise<Email> => {
  const connection = await database.poolConnection()
  try {
    connection.beginTransaction()
    const databaseValue = await database.query({
      query: `
        INSERT INTO tbp_002_people_emails 
          (email, person_id, is_primary) 
        VALUES 
          (?, ?, ?)
      ;`,
      values: [
        data.email,
        data.person_id,
        (data.is_primary ? 1 : 0)
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
          data.person_id
        ]
      }, connection)
    }
    connection.commit()
    const peopleEmailsData: Email | Email[] = await selectPeopleEmails(databaseValue.insertId)
    if(Array.isArray(peopleEmailsData)){
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
