import logger from '@utils/logger'
import { RequestInfo } from '@models/request'
import { addZeroLeft } from '@utils/generals'
import { sendEmail } from '@utils/email'
import { Ticket } from '@models/ticket'
import { Errors } from '@enums/errors'
import insertTickets from '@repositories/tickets/insert'
import insertTicketMessage from '@repositories/tickets_messages/insert'

const createTicketId = (): string => {
  const date: Date = new Date()
  const day: string = addZeroLeft(date.getDate(), 2)
  const month: string = addZeroLeft((date.getMonth() + 1), 2)
  const year: number = date.getFullYear()
  const digit: string = addZeroLeft(date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() + Math.floor(Math.random() * 100), 5)
  const id: string = `${year}${month}${day}${digit}`
  return id
}

/**
 * Create new ticket
 * @param {Ticket} data ticket data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Ticket, reqInfo: RequestInfo): Promise<Ticket> => {
  try {
    const id: string = createTicketId()
    const payload: Ticket = await insertTickets(data, id)
    if (data.message && data.message.length) {
      await insertTicketMessage({
        ticket_id: String(payload.id),
        person_id: data.owner_id,
        message: data.message
      })
    }
    sendEmail(reqInfo, {
      subject: `Novo atendimento criado #${id}`,
      to: payload.owner_email!,
      text: `** Esta é uma mensagem automática, não responda **\n\n\nOlá ${payload.owner_name}, tudo bem?\n\nFoi criado um novo chamado de atendimento em seu nome:\n\nAssunto: ${payload.title}\nMensagem: ${data.message}\n\nQuando este chamado for atualizado, será enviado outro e-mail com a resposta.\n\nAtenciosamente,\nKodit Tecnologia\n\n(PT) Esta mensagem pode conter informação confidencial ou privilegiada, sendo seu sigilo protegido por lei. Se você não for o destinatário ou a pessoa autorizada a receber esta mensagem, não pode usar, copiar ou divulgar as informações nela contidas ou tomar qualquer ação baseada nessas informações. Se você recebeu esta mensagem por engano, por favor, avise imediatamente ao remetente, respondendo o e-mail e em seguida apague-a. Agradecemos sua cooperação.\n\n(EN) This message may contain confidential or privileged information and its confidentiality is protected by law. If you are not the addressed or authorized person to receive this message, you must not use, copy, disclose or take any action based on it or any information herein. If you have received this message by mistake, please advise the sender immediately by replying the e-mail and then deleting it. Thank you for your cooperation`
    })
    logger('info', `New ticket created`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new ticket (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'ETC1',
      errorMessage: Errors.ETC1,
      errorDetails: error || error.message
    }
  }
}
