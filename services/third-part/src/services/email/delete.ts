import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { Errors } from '@enums/errors'
import { EmailSettings } from '@models/email'
import getEmailSettings from '@repositories/settings/select'
import imapConnection, { Config, Box } from 'imap'

const deleteMailmessage = (id: number): Promise<any> => new Promise(
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
      imap.openBox('INBOX', true, (error: Error, box: Box) => {
        if (error) {
          reject(error.message)
        }
        if (!box.messages.total) {
          resolve(true)
        } else {
          if (!id || isNaN(id)) {
            throw new Error('id not set')
          }
          imap.seq.move(id, 'DELETED ITEMS', (error: Error): void => {
            if (error) {
              reject(error.message)
            } else {
              resolve(true)
            }
            imap.end()
          })
        }
      })
    })
    imap.connect()
  })

/**
 * Send email
 * @param {number} id email id
 * @param {RequestInfo} reqInfo request info data
 */
export default async (id: number, reqInfo: RequestInfo): Promise<null> => {
  try {
    await deleteMailmessage(id)
    logger('info', `E-mail ${id} deleted`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on delete e-mail (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EMD3',
      errorMessage: Errors.EMD3,
      errorDetails: error || error.message
    }
  }
}
