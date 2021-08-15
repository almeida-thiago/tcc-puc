import { sign } from 'jsonwebtoken'
import { hash } from 'bcrypt'
import logger from '@utils/logger'
import { validateRecaptcha } from '@utils/security'
import { sendEmail } from '@utils/email'
import { getTokenSecret } from '@utils/generals'
import selectUsers from '@repositories/users/select'
import setUsersSecretCode from '@repositories/users/set_secret_code'
import getPerson from '@repositories/users/get_person'
import { RequestInfo } from '@models/request'
import { User } from '@models/user'
import { ForgotPassword } from '@models/password'
import { Errors } from '@enums/errors'

const digitsGenerator = (digits: number): string => {
  let number: string = String(Math.floor(Math.random() * 9))
  while (number.length < digits) {
    number = number + String(Math.floor(Math.random() * 9))
  }
  return number
}

/**
 * Create new user
 * @param {ForgotPassword} data user data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: ForgotPassword, reqInfo: RequestInfo): Promise<null> => {
  try {
    const recaptchaIsValid: boolean = await validateRecaptcha(data.recaptchaToken!)
    if(!recaptchaIsValid) {
      throw new Error('Recaptcha validation failed')
    }
    const getUser: User | User[] = await selectUsers(data.username)
    if (!getUser || Array.isArray(getUser)) {
      throw new Error(`User ${data.username} not exists`)
    }
    const code: string = digitsGenerator(6)
    const codeHash: string = await hash(code, 10)
    await setUsersSecretCode(data.username, codeHash)
    const personData: any = await getPerson(data.username)
    const tokenData: any = {
      person_id: getUser.person_id,
      person_name: getUser.person_name,
      permission_id: getUser.permission_id,
      permission_level: 0,
      permission_name: getUser.person_name,
    }
    reqInfo.authorization = await sign(tokenData, getTokenSecret())
    await sendEmail(reqInfo, {
      subject: 'Código de verificação',
      to: personData.email!,
      text: `** Esta é uma mensagem automática, não responda **\n\n\nOlá ${personData.name}, tudo bem?\n\nPara criar uma nova senha utilize o código:\n\n${code}\n\nNão compartilhe esta informação com terceiros.\n\nAtenciosamente,\nKodit Tecnologia\n\n(PT) Esta mensagem pode conter informação confidencial ou privilegiada, sendo seu sigilo protegido por lei. Se você não for o destinatário ou a pessoa autorizada a receber esta mensagem, não pode usar, copiar ou divulgar as informações nela contidas ou tomar qualquer ação baseada nessas informações. Se você recebeu esta mensagem por engano, por favor, avise imediatamente ao remetente, respondendo o e-mail e em seguida apague-a. Agradecemos sua cooperação.\n\n(EN) This message may contain confidential or privileged information and its confidentiality is protected by law. If you are not the addressed or authorized person to receive this message, you must not use, copy, disclose or take any action based on it or any information herein. If you have received this message by mistake, please advise the sender immediately by replying the e-mail and then deleting it. Thank you for your cooperation`
    })
    logger('info', `New security code created for change password`, reqInfo)
    return null
  } catch (error) {
    logger('error', `Error on set password forgot (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ERF1',
      errorMessage: Errors.ERF1,
      errorDetails: error || error.message
    }
  }
}
