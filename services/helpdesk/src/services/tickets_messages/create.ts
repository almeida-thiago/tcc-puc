import logger from '@utils/logger'
import { sendEmail } from '@utils/email'
import { RequestInfo } from '@models/request'
import { Message } from '@models/message'
import { Ticket } from '@models/ticket'
import { Errors } from '@enums/errors'
import insertTicketsMessages from '@repositories/tickets_messages/insert'
import selectTickets from '@repositories/tickets/select'

/**
 * Create new ticket message
 * @param {Message} data ticket message data
 * @param {RequestInfo} reqInfo request info data
 */
export default async (data: Message, reqInfo: RequestInfo): Promise<Message> => {
  try {
    const payload: Message = await insertTicketsMessages(data)
    const ticket: Ticket | Ticket[] = await selectTickets(payload.ticket_id)
    if (!Array.isArray(ticket) && payload.person_id !== ticket.owner_id) {
      sendEmail(reqInfo, {
        subject: `Re: ${ticket.title} - #${ticket.id}`,
        to: ticket.owner_email!,
        text: `** Esta é uma mensagem automática, escreva sua mensagem acima desta linha, não apague o conteúdo da mensagem ou modifique o assunto **\n\n\nOlá ${ticket.owner_name}, tudo bem?\n\nUma nova mensagem foi adicionado ao seu chamado de atendimento #${ticket.id}:\n\n${data.message}\n\nVocê pode interagir com este chamado respondendo à mensagem ou acessando http://localhost:3000/ticket/${ticket.id}/${ticket.owner_id}/.\n\nAtenciosamente,\nKodit Tecnologia\n\n(PT) Esta mensagem pode conter informação confidencial ou privilegiada, sendo seu sigilo protegido por lei. Se você não for o destinatário ou a pessoa autorizada a receber esta mensagem, não pode usar, copiar ou divulgar as informações nela contidas ou tomar qualquer ação baseada nessas informações. Se você recebeu esta mensagem por engano, por favor, avise imediatamente ao remetente, respondendo o e-mail e em seguida apague-a. Agradecemos sua cooperação.\n\n(EN) This message may contain confidential or privileged information and its confidentiality is protected by law. If you are not the addressed or authorized person to receive this message, you must not use, copy, disclose or take any action based on it or any information herein. If you have received this message by mistake, please advise the sender immediately by replying the e-mail and then deleting it. Thank you for your cooperation`
      })
    }
    logger('info', `New ticket message created`, reqInfo)
    return payload
  } catch (error) {
    logger('error', `Error on create new ticket message (${error})`, reqInfo)
    throw {
      httpCode: 400,
      errorCode: 'EMC1',
      errorMessage: Errors.EMC1,
      errorDetails: error || error.message
    }
  }
}
