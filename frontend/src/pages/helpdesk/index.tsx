/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import { FiEdit, FiMail, FiPhone, FiMessageSquare, FiGlobe, FiLifeBuoy } from 'react-icons/fi'
import { ProtectedContent, protectedAction, protectedValue } from '@utils/security'
import DataTable, { DataTableHead } from '@components/data-table'
import HelpdeskMenu from '@pages/helpdesk/nav'
import { Content, Column } from '@components/layout'
import Card from '@components/card'
import Badge from '@components/badge'
import { Ticket } from '@models/helpdesk'
import { getTicketsList } from '@services/helpdesk/'
import TicketFormModal from './form'
import TicketDetailsModal from './details'

const head: DataTableHead[] = [
  {
    name: 'channel_icon',
    align: 'center',
    order: false,
    search: false
  },
  {
    name: 'channel_name',
    search: true,
    hidden: true
  },
  {
    name: 'id',
    title: 'Protocolo',
    align: 'center',
    order: true,
    search: true
  },
  {
    name: 'title',
    title: 'Assunto',
    order: true,
    search: true
  },
  {
    name: 'type_name',
    hidden: true,
    search: true
  },
  {
    name: 'owner_name',
    title: 'Pessoa',
    align: 'center',
    order: true,
    search: true
  },
  {
    name: 'departament',
    title: 'Departamento',
    align: 'center',
    order: true,
    search: true
  },
  {
    name: 'agent_name',
    hidden: true,
    search: true
  },
  {
    name: 'status_badge',
    title: 'Status',
    align: 'center',
    order: false,
    search: false
  },
  {
    name: 'status_name',
    search: true,
    hidden: true
  },
  {
    name: 'created_at',
    title: 'Data de criação',
    align: 'center',
    order: true,
    search: true
  },
  {
    name: 'actions',
    title: 'Ações',
    align: 'center',
    order: false,
    search: false,
    hidden: protectedValue({ permission: [0, 1, 2, 3, 4, 5], protectedValue: false, defaultValue: true })
  }
]

const HelpdeskPage = (): JSX.Element => {
  const [showModalDetails, setShowModalDetails] = useState<boolean>(false)
  const [showModalForm, setShowModalForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedData, setSelectedData] = useState<Ticket>()
  const [data, setData] = useState<Ticket[]>([])
  const [dataToSave, setDataToSave] = useState<Ticket[]>([])

  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async (): Promise<void> => {
    try {
      setLoading(true)
      const payload: any = await getTicketsList()
      setData(ajustData(payload))
      setDataToSave(payload)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const ajustData = (data: Ticket[]): Ticket[] =>
    data.map((item: Ticket): any => ({
      ...item,
      departament: `${item.departament_name} (${item.agent_name})\n${item.type_name}`,
      channel_icon: setChannelIcon(item.channel_name!),
      status_badge: setBadge(item.status_name!),
      created_at: new Date(Date.parse(String(item.created_at))).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' })
    }))

  const addActions = (data: Ticket[]): any[] =>
    data.map((item: Ticket): any => ({
      ...item,
      actions: [
        {
          icon: <FiEdit />,
          title: 'Editar',
          action: editDataHandler
        }
      ]
    }))

  const setBadge = (status: string): ReactNode => {
    let style: 'success' | 'warning' | 'danger' | 'info' = 'info'
    let text: 'clear' | 'dark'
    switch (String(status).toUpperCase()) {
      case 'CLOSED':
        style = 'success'
        text = 'dark'
        break
      case 'OPEN':
        style = 'danger'
        text = 'clear'
        break
      case 'WAITING':
        style = 'warning'
        text = 'dark'
        break
      case 'PENDING':
        style = 'warning'
        text = 'dark'
        break
      case 'EXPIRED':
        style = 'danger'
        text = 'clear'
        break
      default:
        style = 'info'
        text = 'dark'
        break
    }
    return <Badge color={style} textColor={text}>{status}</Badge>
  }

  const setChannelIcon = (channel: string = ''): ReactNode => {
    switch (String(channel).toUpperCase()) {
      case 'EMAIL':
        return <FiMail title={channel} />
      case 'PHONE':
        return <FiPhone title={channel} />
      case 'SITE':
        return <FiGlobe title={channel} />
      case 'WHATSAPP':
        return <FiMessageSquare title={channel} />
      default:
        return <FiLifeBuoy title={channel} />
    }
  }

  const addDataHandler = (): void => {
    setSelectedData(undefined)
    setShowModalForm(true)
  }

  const showDataHandler = (data: Ticket): void => {
    setSelectedData(data)
    setShowModalDetails(true)
  }

  const editDataHandler = (data: Ticket): void => {
    setSelectedData(data)
    setShowModalForm(true)
  }

  return (
    <Fragment>
      <TicketFormModal
        data={selectedData}
        showModal={showModalForm}
        setShowModal={setShowModalForm}
        refreshData={getDataHandler}
      />
      <TicketDetailsModal
        data={selectedData}
        showModal={showModalDetails}
        setShowModal={setShowModalDetails}
      />
      <Content type="grid" gap margin>
        <ProtectedContent permission={[0, 1, 2, 3, 4, 5]}>
          <Column colStart={1} colEnd={1} rowStart={1} rowEnd={1}>
            <HelpdeskMenu />
          </Column>
        </ProtectedContent>
        <Column colStart={1} colEnd={1} rowStart={2} rowEnd={2}>
          <Card noPadding>
            <DataTable
              loading={loading}
              title="Lista de Chamados"
              head={head}
              data={addActions(data)}
              onClickRow={showDataHandler}
              onClickRefresh={getDataHandler}
              onClickAdd={protectedAction([0, 1, 2, 3, 4, 5]) ? addDataHandler : undefined}
              downloadCsv={{ filename: 'lista_de_chamados', data: dataToSave }}
            />
          </Card>
        </Column>
      </Content>
    </Fragment>
  )
}

export default HelpdeskPage
