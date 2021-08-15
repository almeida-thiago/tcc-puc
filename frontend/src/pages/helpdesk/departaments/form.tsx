/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import { setValueToFrom, setValueToInput, isInvalid, hasInvalidFields, FormFieldValue } from '@utils/form-helpers'
import { Content } from '@components/layout'
import Modal from '@components/modal'
import InputText from '@components/input-text'
import Button from '@components/button'
import { Departament } from '@models/helpdesk'
import { insertDepartament, updateDepartament } from '@services/helpdesk/departaments'

type DetailModalProps = {
  data?: Departament;
  showModal: boolean;
  setShowModal: Function;
  refreshData?: Function;
}

type FormFields = {
  name: FormFieldValue;
}

const HelpdeskDepartamentFormModal = ({ data, setShowModal, showModal, refreshData = () => { } }: DetailModalProps): JSX.Element => {
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
      const insertData: Departament = {
        name: formFieldsData.name.value,
      }
      setLoading(true)
      const payload: any = await insertDepartament(insertData)
      refreshData()
      setValueToFrom(setFormFieldsData, 'name', 'text', undefined)
      setShowModal(false)
      dispatch(addAlert({
        style: 'success',
        title: 'Departamento criado',
        message: `O departamento ${payload.name} foi criado com o id ${payload.id}.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao criar departamento',
        message: `O departamento ${formFieldsData!.name.value} não foi criado, tente novamente.`
      }))
    } finally {
      setLoading(false)
    }
  }

  const updateDataHandler = (): void => {
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
    const updateData: Departament = {
      ...data,
      name: formFieldsData.name.value
    }
    setLoading(true)
    updateDepartament(String(data!.id), updateData)
      .then((payload: any): void => {
        refreshData()
        dispatch(addAlert({
          style: 'success',
          title: 'Departamento alterado',
          message: `O departamento ${payload.name} (#${payload.id}) foi alterado.`
        }))
      })
      .catch((): void => {
        dispatch(addAlert({
          style: 'danger',
          title: 'Erro ao alterar departamento',
          message: `O departamento ${formFieldsData.name.value} (#${data!.id}) não foi alterada, tente novamente.`
        }))
      })
      .finally(() => setLoading(false))
  }

  return (
    <Modal
      title={data ? `Editar ${data.name}` : 'Cadastrar Novo Departamento'}
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
              (name: string, value: string | number) => setValueToFrom(setFormFieldsData, name, 'text', value)
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

export default HelpdeskDepartamentFormModal
