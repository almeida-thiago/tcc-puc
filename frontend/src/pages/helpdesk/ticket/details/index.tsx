import React, { ChangeEventHandler, MouseEventHandler, RefObject, ReactNode } from 'react'
import { FiSend, FiDownload } from 'react-icons/fi'
import Button from '@components/button'
import { Ticket, TicketMessage, TicketMessageAttachament } from '@models/helpdesk'
import { TicketHead, TicketBody } from './styles'

type TicketInfoProps = {
  data?: Ticket;
}

type TicketInteractionProps = {
  data: TicketMessage[];
  person?: string;
  messagesList: RefObject<HTMLUListElement>;
  sendMessage: MouseEventHandler<HTMLButtonElement>;
  messageValue: string;
  setMessageValue: ChangeEventHandler<HTMLTextAreaElement>;
  loading: boolean;
  status: number;
}

export const TicketInfo = ({ data }: TicketInfoProps): JSX.Element => (
  <TicketHead>
    <h2>{data ? data.title : '-'}</h2>
    <div>
      <p>{data ? `Em ${data.created_at} via ${data.channel_name}` : '-'}</p>
      <p>{data ? `Agente ${data.agent_name}` : '-'}</p>
    </div>
    <div>
      <p>{data ? `Por ${data.owner_name} (#${data.owner_id})` : '-'}</p>
      <p>{data ? `${data.type_name} (${data.departament_name})` : '-'}</p>
    </div>
  </TicketHead>
)

export const TicketInteraction = ({ data, person, messageValue, setMessageValue, sendMessage, messagesList, loading, status }: TicketInteractionProps): JSX.Element => {
  const showAttachament = ({ name, extention, link }: TicketMessageAttachament): ReactNode => {
    switch (extention.toUpperCase()) {
      case 'JPG':
        return (<a href={`Baixar ${link}`} download><img alt={name} src={link} /></a>)
      case 'JPEG':
        return (<a href={`Baixar ${link}`} download><img alt={name} src={link} /></a>)
      case 'PNG':
        return (<a href={`Baixar ${link}`} download><img alt={name} src={link} /></a>)
      default:
        return (<a href={`Baixar ${link}`} download><span><FiDownload />{`Baixar ${name}.${extention}`}</span></a>)
    }
  }

  return (<TicketBody>
    <div className="messages-container">
      <ul ref={messagesList}>
        {data.map(({ id, message, person_name, person_id, created_at, attachaments }: TicketMessage): ReactNode => (
          <li key={id} className={person === person_id ? 'you' : 'other'}>
            <p>{message}
              {attachaments && attachaments.map((attachamentData: TicketMessageAttachament): ReactNode => showAttachament(attachamentData))}
              <small>{`${person_name} em ${created_at}`}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
    <div className="input-container">
      <textarea
        onChange={setMessageValue}
        value={messageValue}
        placeholder="Digite sua mensagem aqui"
        disabled={loading || status === 2 ? true : false}
      />
      <Button
        textColor="clear"
        onClick={sendMessage}
        disabled={loading || status === 2 ? true : false}
      ><FiSend /></Button>
    </div>
  </TicketBody>
  )
}
