/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { FiTrash, FiSlash, FiCheck, FiEdit } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import DataTable, { DataTableHead } from '@components/data-table'
import { Content } from '@components/layout'
import Card from '@components/card'
import { User } from '@models/user'
import { getUsersList, updateUser, deleteUser } from '@services/users'
import UsersFormModal from './form'

const head: DataTableHead[] = [
  {
    name: 'username',
    title: 'Usuário',
    align: 'center',
    order: true,
    search: true
  },
  {
    name: 'person_id',
    order: false,
    search: true,
    hidden: true
  },
  {
    name: 'person_name',
    title: 'Pessoa',
    align: 'center',
    order: true,
    search: true
  },
  {
    name: 'permission_name',
    title: 'Nível de permissão',
    align: 'center',
    order: true,
    search: true
  }, {
    name: 'actions',
    title: 'Ações',
    align: 'center',
    order: false,
    search: false
  }
]

const UsersPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const [showModalForm, setShowModalForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedData, setSelectedData] = useState<User>()
  const [data, setData] = useState<User[]>([])

  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async (): Promise<void> => {
    try {
      setLoading(true)
      const payload: any = await getUsersList()
      setData(ajustData(payload))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const ajustData = (data: User[]): User[] =>
    data.map((item: User): User => {
      return {
        ...item
      }
    })

  const addActions = (data: User[]): any[] =>
    data.map((item: User): any => ({
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
          disabled: item.permission_id === 1,
          action: enableDataHandler
        },
        {
          icon: <FiTrash />,
          title: 'Remover',
          disabled: item.permission_id === 1,
          action: deleteDataHandler
        }
      ]
    }))

  const addDataHandler = (): void => {
    setSelectedData(undefined)
    setShowModalForm(true)
  }

  const editDataHandler = (data: User): void => {
    setSelectedData(data)
    setShowModalForm(true)
  }

  const enableDataHandler = async (data: User): Promise<void> => {
    try {
      data.status = data.status ? false : true
      await updateUser(String(data.username), data)
      getDataHandler()
      dispatch(addAlert({
        style: 'success',
        title: `Usuário ${data.status ? 'ativado' : 'desativado'}`,
        message: `O usuário ${data.username} foi ${data.status ? 'ativado' : 'desativado'}.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: `Erro ao ${data.status ? 'ativar' : 'desativar'} usuário`,
        message: `O usuário ${data.username} não foi alterado, tente novamente.`
      }))
    }
  }

  const deleteDataHandler = async(data: User): Promise<void>=> {
    try {
      await deleteUser(String(data.username))
      getDataHandler()
      dispatch(addAlert({
        style: 'success',
        title: 'Usuário removido',
        message: `O usuário ${data.username} foi removido com sucesso.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao remover usuário',
        message: `O usuário ${data.username} não foi removido, tente novamente.`
      }))
    }
  }

  return (
    <Fragment>
      <UsersFormModal
        data={selectedData}
        showModal={showModalForm}
        setShowModal={setShowModalForm}
        refreshData={getDataHandler}
      />
      <Content type="flex" margin>
        <Card noPadding>
          <DataTable
            loading={loading}
            title="Usuários"
            head={head}
            data={addActions(data)}
            onClickRefresh={getDataHandler}
            onClickAdd={addDataHandler}
          />
        </Card>
      </Content>
    </Fragment>
  )
}

export default UsersPage
