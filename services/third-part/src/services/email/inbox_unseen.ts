import imapConnection, { Config, Box, ImapMessage, ImapMessageBodyInfo } from 'imap'
import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { EmailSettings } from '@models/email'
import { Errors } from '@enums/errors'
import getEmailSettings from '@repositories/settings/select'

const getEmailUnseenMessages = (): Promise<any> => new Promise(
  async (resolve: any, reject: any): Promise<void> => {
    const emailSettings: EmailSettings = await getEmailSettings()
    const options: Config = {
      host: emailSettings.email_imap_host,
      port: emailSettings.email_imap_port,
      user: emailSettings.email_user,
      password: emailSettings?.email_password || '',
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    }
    const imap = new imapConnection(options)
    imap.once('ready', (): void => {
      imap.openBox('INBOX', (error: Error): void => {
        if (error) {
          reject(error.message)
        }
        imap.search(['UNSEEN'], (error: Error, results: number[]): void => {
          if (error) {
            reject(error.message)
          }
          resolve(results.length)
        })
      })
    })
    imap.connect()
  })

/**
 * Read e-mail inbox unseen
 * @param {RequestInfo} reqInfo request info data
 */
export default async (reqInfo: RequestInfo): Promise<boolean> => {
  try {
    const inboxUnseenMessages: number = await getEmailUnseenMessages()
    logger('info', 'Got inbox messages', reqInfo)
    return inboxUnseenMessages ? true : false
  } catch (error) {
    logger('error', `Error on read e-mail inbox (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EMR2',
      errorMessage: Errors.EMR2,
      errorDetails: error || error.message
    }
  }
}
