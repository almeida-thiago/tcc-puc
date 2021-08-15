import imapConnection, { Config, Box, ImapMessage, ImapMessageBodyInfo } from 'imap'
import { simpleParser, ParsedMail } from 'mailparser'
import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { EmailRead, EmailSettings } from '@models/email'
import { Errors } from '@enums/errors'
import getEmailSettings from '@repositories/settings/select'

const getEmailMessages = (): Promise<any> => new Promise(
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
      const messages: string[] = []
      imap.openBox('INBOX', true, (error: Error, box: Box): void => {
        if (error) {
          reject(error.message)
        }
        if (!box.messages.total) {
          resolve(messages)
          imap.end()
        } else {
          const fetch = imap.seq.fetch(`1:${box.messages.total}`, {
            bodies: '',
            markSeen: true,
            struct: true
          })
          fetch.on('message', (msg: ImapMessage): void => {
            let buffer = ''
            msg.on('body', (stream: NodeJS.ReadableStream, info: ImapMessageBodyInfo): void => {
              stream.on('data', (chunk): void => {
                buffer += chunk.toString('utf8')
              })
            })
            msg.once('end', (): void => {
              messages.push(buffer)
            })
          })
          fetch.once('error', (error: Error): void => {
            reject(error.message)
            imap.end()
          })
          fetch.once('end', (): void => {
            imap.end()
            resolve(messages)
          })
        }
      })
    })
    imap.connect()
  })

const parseEmailMessages = (mails: string[]): Promise<EmailRead[]> => new Promise(
  async (resolve: any, reject: any): Promise<void> => {
    const parsedMessages: any[] = []
    for (let index = 0; index < mails.length; index++) {
      const { date, from, subject, text, textAsHtml, html, attachments }: ParsedMail = await simpleParser(mails[index])
      parsedMessages.push({
        id: (index + 1),
        from: from?.value[0].name,
        fromEmail: from?.value[0].address,
        date,
        subject,
        text,
        textAsHtml,
        html,
        attachments
      })
    }
    resolve(parsedMessages)
  })

/**
 * Read e-mail inbox
 * @param {RequestInfo} reqInfo request info data
 */
export default async (reqInfo: RequestInfo): Promise<EmailRead[]> => {
  try {
    const inboxMessages: string[] = await getEmailMessages()
    const parsedMessages: EmailRead[] = await parseEmailMessages(inboxMessages)
    logger('info', 'Got inbox messages', reqInfo)
    return parsedMessages
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
