/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import { setValueToFrom, setValueToInput, isInvalid, hasInvalidFields, FormFieldValue, maskInput } from '@utils/form-helpers'
import { Content, Column } from '@components/layout'
import Modal from '@components/modal'
import InputText from '@components/input-text'
import Button from '@components/button'
import { Person } from '@models/person'
import { insertPerson, updatePerson } from '@services/people'

type DetailModalProps = {
  data?: Person;
  showModal: boolean;
  setShowModal: Function;
  refreshData?: Function;
}

type FormFields = {
  name: FormFieldValue;
  email: FormFieldValue;
  phone_number: FormFieldValue;
}

const PeopleFormModal = ({ data, setShowModal, showModal, refreshData = () => { } }: DetailModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [formFieldsData, setFormFieldsData] = useState<FormFields>()

  useEffect(() => {
    setValueToFrom(setFormFieldsData, 'name', 'text', data?.name)
    setValueToFrom(setFormFieldsData, 'email', 'email', data?.email)
    setValueToFrom(setFormFieldsData, 'phone_number', 'phone', data?.phone_number)
  }, [showModal])

  const addNewDataHandler = async (): Promise<void> => {
    try {
      if (
        !formFieldsData ||
        hasInvalidFields([
          { field: 'name', empty: false },
          { field: 'email', empty: false, format: 'email' },
          { field: 'phone_number', empty: false, format: 'phone' }
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
      const insertData: Person = {
        name: formFieldsData.name.value,
        email: formFieldsData.email.value,
        phone_number: maskInput(formFieldsData.phone_number.value, 'numbers'),
      }
      setLoading(true)
      const payload: any = await insertPerson(insertData)
      refreshData()
      setShowModal(false)
      setValueToFrom(setFormFieldsData, 'name', 'text', undefined)
      setValueToFrom(setFormFieldsData, 'email', 'email', undefined)
      setValueToFrom(setFormFieldsData, 'phone_number', 'phone', undefined)
      dispatch(addAlert({
        style: 'success',
        title: 'Pessoa criada',
        message: `A pessoa ${payload.name} foi criada com o id ${payload.id}.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao criar pessoa',
        message: `A pessoa ${formFieldsData!.name.value} não foi criada, tente novamente.`
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
          { field: 'name', empty: false },
          { field: 'email', empty: false, format: 'email' },
          { field: 'phone_number', empty: false, format: 'phone' }
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
      const updateData: Person = {
        ...data,
        name: formFieldsData.name.value,
        email: formFieldsData.email.value,
        phone_number: maskInput(formFieldsData.phone_number.value, 'numbers'),
      }
      setLoading(true)
      const payload: any = await updatePerson(String(data!.id), updateData)
      refreshData()
      dispatch(addAlert({
        style: 'success',
        title: 'Pessoa alterada',
        message: `A pessoa ${payload.name} (#${payload.id}) foi alterada.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao alterar pessoa',
        message: `A pessoa ${formFieldsData!.name.value} (#${data!.id}) não foi alterada, tente novamente.`
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={data ? `Editar ${data.name}` : 'Cadastrar Nova Pessoa'}
      show={showModal}
      showAction={setShowModal}
      width="35rem"
      height="1rem"
    >
      <Content type="flex">
        <div style={{ flex: 1 }}>
          <Content type="grid" cols={2} rows={2} gap >
            <Column rowStart={1} rowEnd={1} colStart={1} colEnd={2}>
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
                maxLength={250}
              />
            </Column>
            <Column rowStart={2} rowEnd={2} colStart={1} colEnd={1}>
              <InputText
                required
                block
                label="E-mail"
                name="email"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'email', value)
                }
                setValue={setValueToInput(formFieldsData, 'email')}
                invalid={isInvalid(formFieldsData, 'email')}
                disabled={loading}
                placeholder="nome@servidor.com"
                maxLength={250}
              />
            </Column>
            <Column rowStart={2} rowEnd={2} colStart={2} colEnd={2}>
              <InputText
                required
                block
                label="Telefone"
                name="phone_number"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'phone', maskInput(value, 'phone'))
                }
                setValue={setValueToInput(formFieldsData, 'phone_number')}
                invalid={isInvalid(formFieldsData, 'phone_number')}
                disabled={loading}
                placeholder="(00) 0000-0000"
                maxLength={15}
              />
            </Column>
          </Content>
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
        {!data && (<br />)}
      </Content>
    </Modal>
  )
}

export default PeopleFormModal
