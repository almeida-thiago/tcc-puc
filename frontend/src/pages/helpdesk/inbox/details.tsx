import React from 'react'
import Modal from '@components/modal'
import { MessageHead, MessageBody } from './styles'

type DetailModalProps = {
  data?: any;
  showModal: boolean;
  setShowModal: Function;
}

const MessageInfo = ({ data }: any): JSX.Element => (
  <MessageHead>
    <h2>{data ? data.title : '-'}</h2>
    <p dangerouslySetInnerHTML={{ __html: data ? `De ${data.from} <span style="text-transform: lowercase;">&#60;${data.fromEmail}&#62;</span>` : '-' }} />
    <p>{data ? `Em ${data.date}` : '-'}</p>
  </MessageHead>
)

const MessageDetailsModal = ({ data, setShowModal, showModal }: DetailModalProps): JSX.Element => {

  return (
    <Modal title={data?.subject} show={showModal} showAction={setShowModal}>
      <MessageInfo data={data} />
      <MessageBody dangerouslySetInnerHTML={{ __html: data ? data.html ? data.html : data.textAsHtml : null}}></MessageBody>
    </Modal>
  )
}

export default MessageDetailsModal
