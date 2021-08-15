import React, { Fragment, useEffect, useState } from 'react'
import { FiTrash, FiMessageCircle } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import DataTable, { DataTableHead } from '@components/data-table'
import HelpdeskMenu from '@pages/helpdesk/nav'
import { Content, Column } from '@components/layout'
import Card from '@components/card'
import { EmailRead } from '@models/email'
import { getEmailsInboxList, deleteEmail } from '@services/email'
import MessageDetailsModal from './details'
import CreateTicketFormModal from './form'

const head: DataTableHead[] = [
  {
    name: 'subject',
    title: 'Assunto',
    order: true,
    search: true
  }, {
    name: 'from',
    title: 'De',
    align: 'center',
    order: true,
    search: true
  }, {
    name: 'date',
    title: 'Data',
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

const HelpdeskInboxPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const [showModalForm, setShowModalForm] = useState<boolean>(false)
  const [showModalDetails, setShowModalDetails] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedData, setSelectedData] = useState<EmailRead>()
  const [data, setData] = useState<EmailRead[]>([])

  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async (): Promise<void> => {
    try {
      setLoading(true)
      const payload: any = await getEmailsInboxList()
      setData(payload)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const addActions = (data: any[]): any[] =>
    data.map((item: any): any => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      actions: [{
        icon: <FiMessageCircle />,
        title: 'Abrir chamado',
        action: createTicketHandler
      },
      {
        icon: <FiTrash />,
        title: 'Apagar',
        action: deleteDataHandler
      }]
    }))


  const showDataHandler = (data: any): void => {
    setSelectedData(data)
    setShowModalDetails(true)
  }

  const createTicketHandler = (data: any): void => {
    setSelectedData(data)
    setShowModalForm(true)
  }

  const deleteDataHandler = (data: any): void => {
    deleteEmail(String(data.id))
      .then((): void => {
        getDataHandler()
        dispatch(addAlert({
          style: 'success',
          title: 'E-mail apagado',
          message: `O e-mail ${data.subject} foi apagado com sucesso.`
        }))
      })
      .catch((): void => {
        dispatch(addAlert({
          style: 'danger',
          title: 'Erro ao apagar e-mail',
          message: `O e-mail ${data.subject} não foi apagado, tente novamente.`
        }))
      })
  }

  return (
    <Fragment>
      <CreateTicketFormModal
        data={selectedData}
        showModal={showModalForm}
        setShowModal={setShowModalForm}
        refreshData={getDataHandler}
        deleteData={deleteDataHandler}
      />
      <MessageDetailsModal
        data={selectedData}
        showModal={showModalDetails}
        setShowModal={setShowModalDetails}
      />
      <Content type="grid" gap margin>
        <Column colStart={1} colEnd={1} rowStart={1} rowEnd={1}>
          <HelpdeskMenu />
        </Column>
        <Column colStart={1} colEnd={1} rowStart={2} rowEnd={2}>
          <Card noPadding>
            <DataTable
              loading={loading}
              title="Caixa de entrada"
              head={head}
              data={addActions(data)}
              onClickRefresh={getDataHandler}
              onClickRow={showDataHandler}
            />
          </Card>
        </Column>
      </Content>
    </Fragment>
  )
}

export default HelpdeskInboxPage
