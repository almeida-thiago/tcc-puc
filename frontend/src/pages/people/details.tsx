import React from 'react'
import Modal from '@components/modal'
import { Content, Column } from '@components/layout'
import { H3, Paragraph } from '@components/typography'
import { Person } from '@models/person'

type DetailModalProps = {
  data?: Person;
  showModal: boolean;
  setShowModal: Function;
}

const PeopleDetailsModal = ({ data, setShowModal, showModal }: DetailModalProps): JSX.Element => (
  <Modal
    title={`#${data?.id} [${data?.status ? 'ativo' : 'inativo'}]`}
    show={showModal}
    showAction={setShowModal}
    width="40rem"
    height="20rem"
  >
    <Content type="flex">
      <div style={{ flex: 1 }}>
        <Content type="grid" cols={2} rows={2} gap >
          <Column rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
            <Paragraph isLabel>Nome</Paragraph>
            <H3>{data?.name}</H3>
          </Column>
          <Column rowStart={2} rowEnd={2} colStart={1} colEnd={1}>
            <Paragraph isLabel>E-mail</Paragraph>
            <Paragraph>{data?.email}</Paragraph>
          </Column>
          <Column rowStart={2} rowEnd={2} colStart={2} colEnd={2}>
            <Paragraph isLabel>Telefone</Paragraph>
            <Paragraph>{data?.phone_number}</Paragraph>
          </Column>
        </Content>
      </div>
      <Content type="grid" cols={2} rows={1} gap >
        <Column rowStart={1} rowEnd={1} colStart={1} colEnd={1}>
          <Paragraph isLabel>Criado em</Paragraph>
          <Paragraph>{data?.created_at}</Paragraph>
        </Column>
        <Column rowStart={1} rowEnd={1} colStart={2} colEnd={2} style={{ textAlign: 'right' }}>
          <Paragraph isLabel>Última alteração</Paragraph>
          <Paragraph>{data?.last_updated_at}</Paragraph>
        </Column>
      </Content>
    </Content>
  </Modal>
)

export default PeopleDetailsModal
