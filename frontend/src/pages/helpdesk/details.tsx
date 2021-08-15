/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, FormEvent, useLayoutEffect, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import store from '@store/index'
import { LoggedUser } from '@models/user'
import Modal from '@components/modal'
import { Ticket, TicketMessage } from '@models/helpdesk'
import { getTicketsMessagesList, insertTicketMessage } from '@services/helpdesk/messages'
import { TicketInfo, TicketInteraction } from '@pages/helpdesk/ticket/details'

type DetailModalProps = {
  data?: Ticket;
  showModal: boolean;
  setShowModal: Function;
}

const TicketDetailsModal = ({ data, setShowModal, showModal }: DetailModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const { person_id }: LoggedUser = store.getState().user
  const messagesList = createRef<HTMLUListElement>()
  const [loading, setLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<TicketMessage[]>([])
  const [newMessage, setNewMessage] = useState<string>('')

  useEffect(() => {
    if (showModal) {
      getDataHandler()
    }
  }, [showModal])

  useLayoutEffect(() => {
    if (messagesList.current) {
      messagesList.current.scrollTop = messagesList.current?.scrollHeight
    }
  }, [messagesList])

  const getDataHandler = async (): Promise<void> => {
    try {
      setLoading(true)
      const payload: any = await getTicketsMessagesList(data?.id)
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
      if (!data || !newMessage.length) {
        return
      }
      const payload: any = await insertTicketMessage({
        ticket_id: data.id!,
        person_id: person_id || data.owner_id,
        message: newMessage.trim()
      })
      getDataHandler()
      setNewMessage('')
      dispatch(addAlert({
        style: 'success',
        title: 'Mensagem enviada',
        message: `A mensagem foi enviada em resposta ao chamado #${payload.ticket_id}.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao enviar mensagem',
        message: `A mensagem não foi enviada em resposta ao chamado #${data!.id}, tente novamente.`
      }))
    }
  }

  const setValueToMessage = ({ currentTarget }: FormEvent<HTMLTextAreaElement>): void => {
    setNewMessage(currentTarget.value)
  }

  return (
    <Modal title={`#${data?.id} [${data?.status_name}]`} show={showModal} showAction={setShowModal}>
      <TicketInfo data={data} />
      <TicketInteraction
        data={messages}
        person={person_id}
        messagesList={messagesList}
        messageValue={newMessage}
        setMessageValue={setValueToMessage}
        sendMessage={sendMessageHandler}
        loading={loading}
        status={data?.status_id!}
      />
    </Modal>
  )
}

export default TicketDetailsModal
