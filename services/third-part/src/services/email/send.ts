import { createTransport, Transport, } from 'nodemailer'
import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { EmailSend, EmailSettings } from '@models/email'
import { Errors } from '@enums/errors'
import getEmailSettings from '@repositories/settings/select'

/**
 * Send email
 * @param {Email} data email data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: EmailSend, reqInfo: RequestInfo): Promise<any> => {
  try {
    const emailSettings: EmailSettings = await getEmailSettings()
    const options = {
      host: emailSettings.email_smtp_host,
      port: emailSettings.email_smtp_port,
      secure: false,
      auth: {
        user: emailSettings.email_user,
        pass: emailSettings.email_password
      }
    }
    const transporter = createTransport(options)
    const messageInfo = await transporter.sendMail({
      from: '"Kodit Tecnologia" <ola@kodit.com.br>',
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html
    });
    logger('info', `E-mail sent to: ${data.to} (${messageInfo.messageId})`, reqInfo)
    return {
      to: data.to,
      subject: data.subject,
    }
  } catch (error) {
    logger('error', `Error on send e-mail (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EMS1',
      errorMessage: Errors.EMS1,
      errorDetails: error || error.message
    }
  }
}
