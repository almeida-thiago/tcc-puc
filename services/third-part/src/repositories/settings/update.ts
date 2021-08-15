import database from '@utils/database'
import { EmailSettings } from '@models/email'

/**
 * Update e-mail app settings
 * @param {EmailSettings} data e-mail settings data
 */
export default async (data: EmailSettings): Promise<true> => {
  try {
    await database.query({
      query: `
        UPDATE tbs_001_settings 
          SET 
            email_user = ?, 
            email_password = ?, 
            email_imap_host = ?, 
            email_imap_port = ?, 
            email_smtp_host = ?, 
             email_smtp_port = ?
          WHERE id = 1;
      ;`,
      values: [
        new Date(),
        data.email_user,
        data.email_password,
        data.email_imap_host,
        data.email_imap_port,
        data.email_smtp_host,
        data.email_smtp_port
      ]
    })
    return true
  } catch (error) {
    throw error
  }
}
