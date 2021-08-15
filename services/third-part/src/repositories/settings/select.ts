import database from '@utils/database'
import { EmailSettings } from '@models/email'

/**
 * Select e-mail app settings
 */
export default async (): Promise<EmailSettings> => {
  try {
    const data: EmailSettings = await database.query({
      query: `
          SELECT email_user, email_password, email_imap_host, email_imap_port, email_smtp_host, email_smtp_port
          FROM tbs_001_settings
        ;`})
    return data[0]
  } catch (error) {
    throw error
  }
}
