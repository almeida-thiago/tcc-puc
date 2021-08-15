import React, { Fragment, useEffect, useState } from 'react'
import { FiSlash, FiCheck, FiEdit } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import DataTable, { DataTableHead } from '@components/data-table'
import HelpdeskMenu from '@pages/helpdesk/nav'
import { Content, Column } from '@components/layout'
import Card from '@components/card'
import { Channel } from '@models/helpdesk'
import { getChannelsList, updateChannel } from '@services/helpdesk/channels'
import ChannelFormModal from './form'

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

const HelpdeskChannelsPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const [showModalForm, setShowModalForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedData, setSelectedData] = useState<Channel>()
  const [data, setData] = useState<Channel[]>([])

  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async (): Promise<void> => {
    try {
      setLoading(true)
      const payload: any = await getChannelsList()
      setData(payload)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addActions = (data: Channel[]): any[] =>
    data.map((item: Channel): any => ({
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
          disabled: disabledIds(item.id),
          action: enableDataHandler
        }
      ]
    }))

  const addDataHandler = (): void => {
    setSelectedData(undefined)
    setShowModalForm(true)
  }

  const editDataHandler = (data: Channel): void => {
    setSelectedData(data)
    setShowModalForm(true)
  }

  const enableDataHandler = async (data: Channel): Promise<void> => {
    try {
      data.status = data.status ? false : true
      await updateChannel(String(data.id), data)
      getDataHandler()
      dispatch(addAlert({
        style: 'success',
        title: `Canal ${data.status ? 'ativado' : 'desativado'}`,
        message: `O canal ${data.name} foi ${data.status ? 'ativado' : 'desativado'}.`
      }))
    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: `Erro ao ${data.status ? 'ativar' : 'desativar'} canal`,
        message: `O canal ${data.name} não foi alterado, tente novamente.`
      }))
    }
  }

  const disabledIds = (id: number = 0): boolean => {
    switch (id) {
      case 1:
        return true
      case 2:
        return true
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <Fragment>
      <ChannelFormModal
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
              title="Canais"
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

export default HelpdeskChannelsPage
