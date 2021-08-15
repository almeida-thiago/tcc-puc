/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import { setValueToFrom, setValueToInput, isInvalid, hasInvalidFields, FormFieldValue } from '@utils/form-helpers'
import { Content, Column } from '@components/layout'
import Modal from '@components/modal'
import InputTextAutocomplete from '@components/input-autocomplete'
import InputText from '@components/input-text'
import InputTextArea from '@components/input-textarea'
import InputSelect from '@components/input-select'
import Button from '@components/button'
import { EmailRead } from '@models/email'
import { Departament, Ticket, TicketStatus, TicketType } from '@models/helpdesk'
import { Person } from '@models/person'
import { insertTicket } from '@services/helpdesk'
import { getDepartamentsList } from '@services/helpdesk/departaments'
import { getTicketStatusList } from '@services/helpdesk/status'
import { getTicketTypesList } from '@services/helpdesk/types'
import { getPeopleList } from '@services/people'

interface NewTicket extends Ticket {
  message?: string;
}

type DetailModalProps = {
  data?: EmailRead;
  showModal: boolean;
  setShowModal: Function;
  refreshData: Function;
  deleteData: Function;
}

type FormFields = {
  title: FormFieldValue;
  status_id: FormFieldValue;
  departament_id: FormFieldValue;
  type_id: FormFieldValue;
  channel_id: FormFieldValue;
  owner_id: FormFieldValue;
  agent_id: FormFieldValue;
  message: FormFieldValue;
}

const CreateTicketFormModal = ({ data, setShowModal, showModal, refreshData, deleteData }: DetailModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [formFieldsData, setFormFieldsData] = useState<FormFields>()
  const [departamentsList, setDepartamentsList] = useState<Departament[]>([])
  const [ticketStatusList, setTicketStatusList] = useState<TicketStatus[]>([])
  const [ticketTypesList, setTicketTypesList] = useState<TicketType[]>([])
  const [peopleList, setPeopleList] = useState<Person[]>([])

  useEffect(() => {
    if (showModal) {
      setValueToFrom(setFormFieldsData, 'title', 'text', data?.subject)
      setValueToFrom(setFormFieldsData, 'status_id', 'number', 1)
      setValueToFrom(setFormFieldsData, 'departament_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'type_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'channel_id', 'number', 1)
      setValueToFrom(setFormFieldsData, 'owner_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'agent_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'message', 'text', data?.text)
      getDepartamentsList()
        .then((payload: any): void => setDepartamentsList(payload))
      getTicketStatusList()
        .then((payload: any): void => setTicketStatusList(payload))
      getTicketTypesList()
        .then((payload: any): void => setTicketTypesList(payload))
      getPeopleList()
        .then((payload: any): void => setPeopleList(payload))
    }
  }, [showModal])

  const addNewDataHandler = async (): Promise<void> => {
    try {
      if (
        !formFieldsData ||
        hasInvalidFields([
          { field: 'title', empty: false },
          { field: 'status_id', empty: false, format: 'number' },
          { field: 'departament_id', empty: false, format: 'number' },
          { field: 'type_id', empty: false, format: 'number' },
          { field: 'owner_id', empty: false, format: 'number' },
          { field: 'agent_id', empty: false, format: 'number' },
          { field: 'message', empty: false }
        ], formFieldsData, setFormFieldsData)
      ) {
        dispatch(addAlert({
          time: 5000,
          style: 'warning',
          title: 'Dados inválidos',
          message: `Verifique os dados infomados e tente novamente. Os campos marcados com * (asterisco) são de preenchimento obrigatório.`
        }))
        return
      }
      const insertData: NewTicket = {
        title: formFieldsData.title.value,
        status_id: parseInt(formFieldsData.status_id.value),
        departament_id: parseInt(formFieldsData.departament_id.value),
        type_id: parseInt(formFieldsData.type_id.value),
        channel_id: parseInt(formFieldsData.channel_id.value),
        owner_id: formFieldsData.owner_id.value,
        agent_id: formFieldsData.agent_id.value,
        message: formFieldsData.message.value
      }
      setLoading(true)
      const payload: any = await insertTicket(insertData)
      refreshData()
      deleteData(data)
      setValueToFrom(setFormFieldsData, 'title', 'text', undefined)
      setValueToFrom(setFormFieldsData, 'status_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'departament_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'type_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'channel_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'owner_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'agent_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'message', 'text', undefined)
      setShowModal(false)
      dispatch(addAlert({
        style: 'success',
        title: 'Chamado criado',
        message: `O chamado ${payload.title} foi criado com o id ${payload.id}.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao criar chamado',
        message: `o chamado ${formFieldsData!.title.value} não foi criado, tente novamente.`
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Cadastrar Novo Chamado"
      show={showModal}
      showAction={setShowModal}
    >
      <Content type="flex">
        <div style={{ flex: 1 }}>
          <Content type="grid" cols={4} rows={4} gap >
            <Column rowStart={1} rowEnd={1} colStart={1} colEnd={3}>
              <InputText
                required
                block
                label="Título"
                name="title"
                getValue={
                  (name: string, value: string | number): void =>
                    setValueToFrom(setFormFieldsData, name, 'text', value)
                }
                setValue={setValueToInput(formFieldsData, 'title')}
                invalid={isInvalid(formFieldsData, 'title')}
                disabled={loading}
                maxLength={120}
              />
            </Column>
            <Column rowStart={1} rowEnd={1} colStart={4} colEnd={4}>
              <InputSelect
                required
                block
                label="Status"
                name="status_id"
                getValue={
                  (name: string, value: string | number): void =>
                    setValueToFrom(setFormFieldsData, name, 'number', value)
                }
                setValue={setValueToInput(formFieldsData, 'status_id')}
                invalid={isInvalid(formFieldsData, 'status_id')}
                disabled={loading}
                options={ticketStatusList.map(({ id, name }: TicketStatus) => ({ label: name, value: id }))}
              />
            </Column>
            <Column rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
              <InputSelect
                required
                block
                label="Departamento"
                name="departament_id"
                getValue={
                  (name: string, value: string | number): void =>
                    setValueToFrom(setFormFieldsData, name, 'number', value)
                }
                setValue={setValueToInput(formFieldsData, 'departament_id')}
                invalid={isInvalid(formFieldsData, 'departament_id')}
                disabled={loading}
                options={departamentsList.map(({ id, name }: Departament) => ({ label: name, value: id }))}
              />
            </Column>
            <Column rowStart={2} rowEnd={2} colStart={3} colEnd={4}>
              <InputSelect
                required
                block
                label="Tipo de chamado"
                name="type_id"
                getValue={
                  (name: string, value: string | number): void =>
                    setValueToFrom(setFormFieldsData, name, 'number', value)
                }
                setValue={setValueToInput(formFieldsData, 'type_id')}
                invalid={isInvalid(formFieldsData, 'type_id')}
                disabled={loading}
                options={ticketTypesList.map(({ id, name }: TicketType) => ({ label: name, value: id }))}
              />
            </Column>
            <Column colStart={1} colEnd={4}>
              <InputTextAutocomplete
                required
                block
                label="Pessoa"
                name="owner_id"
                getValue={
                  (name: string, value: string | number): void =>
                    setValueToFrom(setFormFieldsData, name, 'number', value)
                }
                setValue={setValueToInput(formFieldsData, 'owner_id')}
                invalid={isInvalid(formFieldsData, 'owner_id')}
                disabled={loading}
                options={peopleList.map(({ id, name, email }: Person) => ({ label: `${name} (${email})`, value: id }))}
              />
            </Column>
            <Column colStart={1} colEnd={4}>
              <InputTextAutocomplete
                required
                block
                label="Agente"
                name="agent_id"
                getValue={
                  (name: string, value: string | number): void =>
                    setValueToFrom(setFormFieldsData, name, 'number', value)
                }
                setValue={setValueToInput(formFieldsData, 'agent_id')}
                invalid={isInvalid(formFieldsData, 'agent_id')}
                disabled={loading}
                options={peopleList.map(({ id, name, email }: Person) => ({ label: `${name} (${email})`, value: id }))}
              />
            </Column>
            <Column colStart={1} colEnd={4}>
              <InputTextArea
                required
                block
                label="Mensagem"
                name="message"
                getValue={
                  (name: string, value: string | number): void =>
                    setValueToFrom(setFormFieldsData, name, 'text', value)
                }
                invalid={isInvalid(formFieldsData, 'message')}
                disabled={loading}
                rows={20}
                maxLength={2000}
              >{formFieldsData?.message.value}</InputTextArea>
            </Column>
          </Content>
        </div>
        <Button
          noMargin
          color="primary"
          textColor="clear"
          onClick={addNewDataHandler}
          loading={loading}
        >Cadastrar</Button>
        <br />
      </Content>
    </Modal>
  )
}

export default CreateTicketFormModal
