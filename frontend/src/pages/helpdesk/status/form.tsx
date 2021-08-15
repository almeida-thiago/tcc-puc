/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import { setValueToFrom, setValueToInput, isInvalid, hasInvalidFields, FormFieldValue } from '@utils/form-helpers'
import { Content } from '@components/layout'
import Modal from '@components/modal'
import InputText from '@components/input-text'
import Button from '@components/button'
import { TicketStatus } from '@models/helpdesk'
import { insertTicketStatus, updateTicketStatus } from '@services/helpdesk/status'

type DetailModalProps = {
  data?: TicketStatus;
  showModal: boolean;
  setShowModal: Function;
  refreshData?: Function;
}

type FormFields = {
  name: FormFieldValue;
}

const HelpdeskTicketStatusFormModal = ({ data, setShowModal, showModal, refreshData = () => { } }: DetailModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [formFieldsData, setFormFieldsData] = useState<FormFields>()

  useEffect(() => {
    setValueToFrom(setFormFieldsData, 'name', 'text', data?.name)
  }, [showModal])

  const addNewDataHandler = async (): Promise<void> => {
    try {
      if (
        !formFieldsData ||
        hasInvalidFields([
          { field: 'name', empty: false }
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
      const insertData: TicketStatus = {
        name: formFieldsData.name.value,
      }
      setLoading(true)
      const payload: any = await insertTicketStatus(insertData)
      refreshData()
      setValueToFrom(setFormFieldsData, 'name', 'text', undefined)
      setShowModal(false)
      dispatch(addAlert({
        style: 'success',
        title: 'Status criado',
        message: `O status ${payload.name} foi criado com o id ${payload.id}.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao criar status',
        message: `O status ${formFieldsData!.name.value} não foi criado, tente novamenete.`
      }))
    } finally {
      setLoading(false)
    }
  }

  const updateDataHandler = async (): Promise<void> => {
    try {
      if (
        !formFieldsData ||
        hasInvalidFields([
          { field: 'name', empty: false }
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
      const updateData: TicketStatus = {
        ...data,
        name: formFieldsData.name.value
      }
      setLoading(true)
      const payload: any = await updateTicketStatus(String(data!.id), updateData)
      refreshData()
      dispatch(addAlert({
        style: 'success',
        title: 'Status alterado',
        message: `O status ${payload.name} (#${payload.id}) foi alterado.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao alterar status',
        message: `O status ${formFieldsData!.name.value} (#${data!.id}) não foi alterado, tente novamente.`
      }))
    }
  }

  return (
    <Modal
      title={data ? `Editar ${data.name}` : 'Cadastrar Novo Status'}
      show={showModal}
      showAction={setShowModal}
      width="1rem"
      height="1rem"
    >
      <Content type="flex">
        <div style={{ flex: 1 }}>
          <InputText
            required
            block
            label="Nome"
            name="name"
            getValue={
              (name: string, value: string | number) =>
                setValueToFrom(setFormFieldsData, name, 'text', value)
            }
            setValue={setValueToInput(formFieldsData, 'name')}
            invalid={isInvalid(formFieldsData, 'name')}
            disabled={loading}
            maxLength={45}
          />
        </div>
        <Button
          noMargin
          color="primary"
          textColor="clear"
          onClick={data ? updateDataHandler : addNewDataHandler}
          loading={loading}
        >
          {data ? 'Salvar' : 'Cadastrar'}
        </Button>
      </Content>
    </Modal>
  )
}

export default HelpdeskTicketStatusFormModal
