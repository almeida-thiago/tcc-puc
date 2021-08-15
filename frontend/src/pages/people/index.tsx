/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { FiTrash, FiSlash, FiCheck, FiEdit } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import { maskInput } from '@utils/form-helpers'
import DataTable, { DataTableHead } from '@components/data-table'
import { Content } from '@components/layout'
import Card from '@components/card'
import { Person } from '@models/person'
import { getPeopleList, updatePerson, deletePerson } from '@services/people'
import PeopleFormModal from './form'
import PeopleDetailsModal from './details'

const head: DataTableHead[] = [
  {
    name: 'name',
    title: 'Nome',
    order: true,
    search: true
  }, {
    name: 'email',
    title: 'E-mail',
    order: true,
    search: true
  }, {
    name: 'phone_number',
    title: 'Telefone',
    align: 'center',
    order: false,
    search: true
  }, {
    name: 'actions',
    title: 'Ações',
    align: 'center',
    order: false,
    search: false
  }
]

const PeoplePage = (): JSX.Element => {
  const dispatch = useDispatch()
  const [showModalDetails, setShowModalDetails] = useState<boolean>(false)
  const [showModalForm, setShowModalForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedData, setSelectedData] = useState<Person>()
  const [data, setData] = useState<Person[]>([])
  const [dataToSave, setDataToSave] = useState<Person[]>([])

  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async (): Promise<void> => {
    try {
      setLoading(true)
      const payload: any = await getPeopleList()
      setData(ajustData(payload))
      setDataToSave(payload)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const ajustData = (data: Person[]): Person[] =>
    data.map((item: Person): Person => {
      if (!item.phone_number) {
        return item
      }
      return {
        ...item,
        last_updated_at: new Date(Date.parse(String(item.created_at))).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' }),
        created_at: new Date(Date.parse(String(item.created_at))).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' }),
        phone_number: maskInput(item.phone_number, 'phone')
      }
    })

  const addActions = (data: Person[]): any[] =>
    data.map((item: Person): any => ({
      ...item,
      actions: [
        {
          icon: <FiEdit />,
          title: 'Editar',
          action: editDataHandler
        },
        {
          icon: item.status ? <FiSlash /> : <FiCheck />,
          title: item.status ? 'Desativar' : 'Ativar',
          action: enableDataHandler
        },
        {
          icon: <FiTrash />,
          title: 'Remover',
          action: deleteDataHandler
        }
      ]
    }))

  const addDataHandler = (): void => {
    setSelectedData(undefined)
    setShowModalForm(true)
  }

  const showDataHandler = (data: Person): void => {
    setSelectedData(data)
    setShowModalDetails(true)
  }

  const editDataHandler = (data: Person): void => {
    setSelectedData(data)
    setShowModalForm(true)
  }

  const enableDataHandler = async (data: Person): Promise<void> => {
    try {
      data.status = data.status ? false : true
      await updatePerson(String(data.id), data)
      getDataHandler()
      dispatch(addAlert({
        style: 'success',
        title: `Pessoa ${data.status ? 'ativada' : 'desativada'}`,
        message: `A pessoa ${data.name} (#${data.id}) foi ${data.status ? 'ativada' : 'desativada'}.`
      }))

    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: `Erro ao ${data.status ? 'ativar' : 'desativar'} pessoa`,
        message: `A pessoa ${data.name} (#${data.id}) não foi alterada, tente novamente.`
      }))
    }
  }

  const deleteDataHandler = async (data: Person): Promise<void> => {
    try {
      await deletePerson(String(data.id))
      getDataHandler()
      dispatch(addAlert({
        style: 'success',
        title: 'Pessoa removida',
        message: `A pessoa ${data.name} (#${data.id}) foi removida com sucesso.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao remover pessoa',
        message: `A pessoa ${data.name} (#${data.id}) não foi removida, tente novamente.`
      }))
    }
  }

  return (
    <Fragment>
      <PeopleFormModal
        data={selectedData}
        showModal={showModalForm}
        setShowModal={setShowModalForm}
        refreshData={getDataHandler}
      />
      <PeopleDetailsModal
        data={selectedData}
        showModal={showModalDetails}
        setShowModal={setShowModalDetails}
      />
      <Content type="flex" margin>
        <Card noPadding>
          <DataTable
            loading={loading}
            title="Pessoas"
            head={head}
            data={addActions(data)}
            onClickRow={showDataHandler}
            onClickRefresh={getDataHandler}
            onClickAdd={addDataHandler}
            downloadCsv={{ filename: 'lista_de_pessoas', data: dataToSave }}
          />
        </Card>
      </Content>
    </Fragment>
  )
}

export default PeoplePage
