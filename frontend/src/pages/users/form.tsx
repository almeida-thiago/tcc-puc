/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import { setValueToFrom, setValueToInput, isInvalid, hasInvalidFields, FormFieldValue } from '@utils/form-helpers'
import { Content, Column } from '@components/layout'
import Modal from '@components/modal'
import InputText from '@components/input-text'
import InputTextAutocomplete from '@components/input-autocomplete'
import InputSelect from '@components/input-select'
import Button from '@components/button'
import { User, Permission } from '@models/user'
import { Person } from '@models/person'
import { insertUser, updateUser } from '@services/users'
import { getPermissionsList } from '@services/users/permissions'
import { getPeopleList } from '@services/people'

type DetailModalProps = {
  data?: User;
  showModal: boolean;
  setShowModal: Function;
  refreshData?: Function;
}

type FormFields = {
  username: FormFieldValue;
  password: FormFieldValue;
  password_confirm: FormFieldValue;
  permission_id: FormFieldValue;
  person_id: FormFieldValue;
}

const PeopleFormModal = ({ data, setShowModal, showModal, refreshData = () => { } }: DetailModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [formFieldsData, setFormFieldsData] = useState<FormFields>()
  const [permissionsList, setPermissionsList] = useState<Permission[]>([])
  const [peopleList, setPeopleList] = useState<Person[]>([])

  useEffect(() => {
    setValueToFrom(setFormFieldsData, 'username', 'text', data?.username)
    setValueToFrom(setFormFieldsData, 'password', 'text', undefined)
    setValueToFrom(setFormFieldsData, 'password_confirm', 'text', undefined)
    setValueToFrom(setFormFieldsData, 'permission_id', 'number', data?.permission_id)
    setValueToFrom(setFormFieldsData, 'person_id', 'number', data?.person_id)
    getPermissionsList()
      .then((payload: any): void => setPermissionsList(payload))
    getPeopleList()
      .then((payload: any): void => setPeopleList(payload))
  }, [showModal])

  const addNewDataHandler = async (): Promise<void> => {
    try {
      if (
        !formFieldsData ||
        hasInvalidFields([
          { field: 'username', empty: false },
          { field: 'password', empty: false },
          { field: 'password_confirm', empty: false },
          { field: 'permission_id', empty: false },
          { field: 'person_id', empty: false }
        ], formFieldsData, setFormFieldsData) ||
        formFieldsData.password.value !== formFieldsData.password_confirm.value
      ) {
        dispatch(addAlert({
          time: 5000,
          style: 'warning',
          title: 'Dados inválidos',
          message: `Verifique os dados infomados e tente novamente. Os campos marcados com * (asterisco) são de preenchimento obrigatório.`
        }))
        return
      }
      const insertData: User = {
        username: formFieldsData.username.value,
        password: formFieldsData.password.value,
        permission_id: parseInt(formFieldsData.permission_id.value),
        person_id: formFieldsData.person_id.value
      }
      setLoading(true)
      const payload: any = await insertUser(insertData)
      refreshData()
      setShowModal(false)
      setValueToFrom(setFormFieldsData, 'username', 'text', undefined)
      setValueToFrom(setFormFieldsData, 'password', 'text', undefined)
      setValueToFrom(setFormFieldsData, 'password_confirm', 'text', undefined)
      setValueToFrom(setFormFieldsData, 'permission_id', 'number', undefined)
      setValueToFrom(setFormFieldsData, 'person_id', 'number', undefined)
      dispatch(addAlert({
        style: 'success',
        title: 'Usuário criado',
        message: `O usuário ${payload.username} foi criado para a pessoa ${payload.person_name}.`
      }))

    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao criar usuário',
        message: `O usuário ${formFieldsData!.username.value} não foi criada, tente novamente.`
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
          { field: 'username', empty: false },
          { field: 'password', empty: false },
          { field: 'password_confirm', empty: false },
          { field: 'permission_id', empty: false },
          { field: 'person_id', empty: false }
        ], formFieldsData, setFormFieldsData) ||
        formFieldsData.password.value !== formFieldsData.password_confirm.value
      ) {
        dispatch(addAlert({
          time: 5000,
          style: 'warning',
          title: 'Dados inválidos',
          message: `Verifique os dados infomados e tente novamente. Os campos marcados com * (asterisco) são de preenchimento obrigatório.`
        }))
        return
      }
      const updateData: User = {
        ...data,
        username: formFieldsData.username.value,
        password: formFieldsData.password.value,
        permission_id: parseInt(formFieldsData.permission_id.value),
        person_id: formFieldsData.person_id.value
      }
      setLoading(true)
      const payload: any = await updateUser(String(data!.username), updateData)
      refreshData()
      dispatch(addAlert({
        style: 'success',
        title: 'Usuário alterado',
        message: `A pessoa ${payload.name} (#${payload.id}) foi alterada.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao alterar usuário',
        message: `A pessoa ${formFieldsData!.username.value} não foi alterada, tente novamente.`
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={data ? `Editar ${data.username}` : 'Cadastrar Novo Usuário'}
      show={showModal}
      showAction={setShowModal}
      width="35rem"
      height="1rem"
    >
      <Content type="flex">
        <div style={{ flex: 1 }}>
          <Content type="grid" cols={2} rows={3} gap >
            <Column rowStart={1} rowEnd={1} colStart={1} colEnd={1}>
              <InputText
                required
                block
                label="Usuário"
                name="username"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'username', value)
                }
                setValue={setValueToInput(formFieldsData, 'username')}
                invalid={isInvalid(formFieldsData, 'username')}
                disabled={loading}
                maxLength={250}
              />
            </Column>
            <Column rowStart={1} rowEnd={1} colStart={2} colEnd={2}>
              <InputSelect
                required
                block
                label="Nível de permissão"
                name="permission_id"
                getValue={
                  (name: string, value: string | number): void =>
                    setValueToFrom(setFormFieldsData, name, 'number', value)
                }
                setValue={setValueToInput(formFieldsData, 'permission_id')}
                invalid={isInvalid(formFieldsData, 'permission_id')}
                disabled={loading}
                options={permissionsList.map(({ id, name }: Permission) => ({ label: name, value: id }))}
              />
            </Column>
            <Column rowStart={2} rowEnd={2} colStart={1} colEnd={2}>
              <InputTextAutocomplete
                required
                block
                label="Pessoa"
                name="person_id"
                getValue={
                  (name: string, value: string | number): void =>
                    setValueToFrom(setFormFieldsData, name, 'number', value)
                }
                setValue={setValueToInput(formFieldsData, 'person_id')}
                invalid={isInvalid(formFieldsData, 'person_id')}
                disabled={loading}
                options={peopleList.map(({ id, name, email }: Person) => ({ label: `${name} (${email})`, value: id }))}
              />
            </Column>
            <Column rowStart={3} rowEnd={3} colStart={1} colEnd={1}>
              <InputText
                password
                required
                block
                label="Senha"
                name="password"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'phone', value)
                }
                setValue={setValueToInput(formFieldsData, 'password')}
                invalid={isInvalid(formFieldsData, 'password')}
                disabled={loading}
                maxLength={15}
              />
            </Column>
            <Column rowStart={3} rowEnd={3} colStart={2} colEnd={2}>
              <InputText
                password
                required
                block
                label="Confirmação da senha"
                name="password_confirm"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'text', value)
                }
                setValue={setValueToInput(formFieldsData, 'password_confirm')}
                invalid={isInvalid(formFieldsData, 'password_confirm')}
                disabled={loading}
                maxLength={250}
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
