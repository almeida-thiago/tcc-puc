import React, { Fragment, useEffect, useState } from 'react'
import { FiSlash, FiCheck, FiEdit } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import DataTable, { DataTableHead } from '@components/data-table'
import HelpdeskMenu from '@pages/helpdesk/nav'
import { Content, Column } from '@components/layout'
import Card from '@components/card'
import { TicketType } from '@models/helpdesk'
import { getTicketTypesList, updateTicketType } from '@services/helpdesk/types'
import TicketStatusFormModal from './form'

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

const HelpdeskTicketTypesPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const [showModalForm, setShowModalForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedData, setSelectedData] = useState<TicketType>()
  const [data, setData] = useState<TicketType[]>([])

  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async (): Promise<void> => {
    try {
      const payload: any = await getTicketTypesList()
      setData(payload)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addActions = (data: TicketType[]): any[] =>
    data.map((item: TicketType): any => ({
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

  const editDataHandler = (data: TicketType): void => {
    setSelectedData(data)
    setShowModalForm(true)
  }

  const enableDataHandler = async (data: TicketType): Promise<void> => {
    try {
      data.status = data.status ? false : true
      await updateTicketType(String(data.id), data)
      getDataHandler()
      dispatch(addAlert({
        style: 'success',
        title: `Tipo de chamado ${data.status ? 'ativado' : 'desativado'}`,
        message: `O tipo de chamado ${data.name} foi ${data.status ? 'ativado' : 'desativado'}.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: `Erro ao ${data.status ? 'ativar' : 'desativar'} tipo de chamado`,
        message: `O tipo de chamado ${data.name} não foi alterado, tente novamenete.`
      }))
    }
  }

  return (
    <Fragment>
      <TicketStatusFormModal
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
              title="Tipos de Chamado"
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

export default HelpdeskTicketTypesPage
