/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, FormEvent, useLayoutEffect, useEffect, useState, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { addAlert } from '@store/alerts'
import { PageContentLoading } from '@components/layout'
import { Ticket, TicketMessage } from '@models/helpdesk'
import { getTicketsList } from '@services/helpdesk'
import { getTicketsMessagesList, insertTicketMessage } from '@services/helpdesk/messages'
import { TicketContainer } from './styles'
import { TicketInfo, TicketInteraction } from '@pages/helpdesk/ticket/details'

const TicketPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const { id, user } = useParams<{ id: string; user: string }>()
  const history = useHistory()
  const messagesList = createRef<HTMLUListElement>()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Ticket>()
  const [messages, setMessages] = useState<TicketMessage[]>([])
  const [newMessage, setNewMessage] = useState<string>('')

  useEffect(() => {
    getDataHandler()
  }, [])

  useLayoutEffect(() => {
    if (messagesList.current) {
      messagesList.current.scrollTop = messagesList.current?.scrollHeight
    }
  }, [messagesList])

  const getDataHandler = async (): Promise<void> => {
    try {
      setLoading(true)
      const payload: any = await getTicketsList(id)
      if (payload.owner_id !== user) {
        history.replace('/denied')
      }
      setData(payload)
      getMessagesHandler()
    } catch (error) {
      history.replace('/not-found')
    } finally {
      setLoading(false)
    }
  }

  const getMessagesHandler = async (): Promise<void> => {
    try {
      const payload: any = await getTicketsMessagesList(id)
      setMessages(ajustData(payload))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const ajustData = (data: TicketMessage[]): TicketMessage[] =>
    data.map((item: TicketMessage): TicketMessage => ({
      ...item,
      created_at: new Date(Date.parse(String(item.created_at))).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' })
    }))

  const sendMessageHandler = async (): Promise<void> => {
    try {
      if (!id || !newMessage.length) {
        return
      }
      const payload: any = await insertTicketMessage({
        ticket_id: id,
        person_id: data!.owner_id,
        message: newMessage.trim()
      })
      getMessagesHandler()
      setNewMessage('')
      dispatch(addAlert({
        style: 'success',
        title: 'Mensagem enviada',
        message: `A mensagem foi enviada em resposta ao chamado #${payload.ticket_id}.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao enviar mensangem',
        message: `A mensagem não foi enviada em resposta ao chamado #${id}, tente novamente.`
      }))
    }
  }

  const setValueToMessage = ({ currentTarget }: FormEvent<HTMLTextAreaElement>): void => {
    setNewMessage(currentTarget.value)
  }

  return (
    <TicketContainer>
      {loading ? <PageContentLoading background="#ffffff" /> : (
        <Fragment>
          <TicketInfo data={data} />
          <TicketInteraction
            data={messages}
            person={user}
            messagesList={messagesList}
            messageValue={newMessage}
            setMessageValue={setValueToMessage}
            sendMessage={sendMessageHandler}
            loading={loading}
            status={data?.status_id!}
          />
        </Fragment>
      )}
    </TicketContainer>
  )
}

export default TicketPage
