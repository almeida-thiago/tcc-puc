import React, { Fragment, useEffect, useState } from 'react'
import { FiSlash, FiCheck, FiEdit } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import DataTable, { DataTableHead } from '@components/data-table'
import HelpdeskMenu from '@pages/helpdesk/nav'
import { Content, Column } from '@components/layout'
import Card from '@components/card'
import { Departament } from '@models/helpdesk'
import { getDepartamentsList, updateDepartament } from '@services/helpdesk/departaments'
import DepartamentFormModal from './form'

const head: DataTableHead[] = [
  {
    name: 'name',
    title: 'Nome',
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

const HelpdeskDepartamentsPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const [showModalForm, setShowModalForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedData, setSelectedData] = useState<Departament>()
  const [data, setData] = useState<Departament[]>([])

  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async (): Promise<void> => {
    try {
      setLoading(true)
      const payload: any = await getDepartamentsList()
      setData(payload)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addActions = (data: Departament[]): any[] =>
    data.map((item: Departament): any => ({
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
        }
      ]
    }))

  const addDataHandler = (): void => {
    setSelectedData(undefined)
    setShowModalForm(true)
  }

  const editDataHandler = (data: Departament): void => {
    setSelectedData(data)
    setShowModalForm(true)
  }

  const enableDataHandler = async (data: Departament): Promise<void> => {
    try {
      data.status = data.status ? false : true
      await updateDepartament(String(data.id), data)
      getDataHandler()
      dispatch(addAlert({
        style: 'success',
        title: `Departamento ${data.status ? 'ativado' : 'desativado'}`,
        message: `O departamento ${data.name} foi ${data.status ? 'ativado' : 'desativado'}.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: `Erro ao ${data.status ? 'ativar' : 'desativar'} departamento`,
        message: `O departamento ${data.name} não foi alterado, tente novamente.`
      }))
    }
  }

  return (
    <Fragment>
      <DepartamentFormModal
        data={selectedData}
        showModal={showModalForm}
        setShowModal={setShowModalForm}
        refreshData={getDataHandler}
      />
      <Content type="grid" gap margin>
        <Column colStart={1} colEnd={1} rowStart={1} rowEnd={1}>
          <HelpdeskMenu />
        </Column>
        <Column colStart={1} colEnd={1} rowStart={2} rowEnd={2}>
          <Card noPadding>
            <DataTable
              loading={loading}
              title="Departamentos"
              head={head}
              data={addActions(data)}
              onClickRefresh={getDataHandler}
              onClickAdd={addDataHandler}
            />
          </Card>
        </Column>
      </Content>
    </Fragment>
  )
}

export default HelpdeskDepartamentsPage
