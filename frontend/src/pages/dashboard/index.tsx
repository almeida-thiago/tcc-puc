/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { FiInbox, FiMessageCircle, FiAlertCircle, FiUser } from 'react-icons/fi'
import { Pie, Line } from 'react-chartjs-2'
import { ChartData } from 'chart.js'
import { Content, Column, PageContentLoading } from '@components/layout'
import Card from '@components/card'
import { H2, H4 } from '@components/typography'
import { getPeopleInfo } from '@services/people'
import { getTicketsInfo } from '@services/helpdesk'

const DashboardPage = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true)
  const [people, setPeople] = useState<any>()
  const [tickets, setTickets] = useState<any[]>([])

  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async (): Promise<void> => {
    try {
      setLoading(true)
      const peoplePayload: any = await getPeopleInfo()
      setPeople(peoplePayload)
      const ticketsPayload: any = await getTicketsInfo()
      setTickets(ticketsPayload)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const ticketsCount = (id: number): number =>
    tickets.filter(({ status_id }: any) => status_id === id).length

  const ticketsMonth = (): ChartData => {
    const allTickets: string[] = tickets.map(({ created_at }: any): string => {
      const month = new Date(created_at).getMonth()
      switch (month) {
        case 1:
          return 'january'
        case 2:
          return 'february'
        case 3:
          return 'march'
        case 4:
          return 'april'
        case 5:
          return 'may'
        case 6:
          return 'june'
        case 7:
          return 'july'
        case 8:
          return 'august'
        case 9:
          return 'september'
        case 10:
          return 'october'
        case 11:
          return 'november'
        case 12:
          return 'december'
        default:
          return 'not set'
      }
    })
    const data: any = {}
    allTickets.forEach((item: string): any => {
      data[item] = (data[item] || 0) + 1
    })
    return {
      labels: Object.keys(data),
      datasets: [{
        label: 'Número de chamados',
        data: Object.values(data),
        backgroundColor: '#FF7849',
        borderColor: '#FF7849'
      }]
    }
  }

  const ticketsTypes = (): ChartData => {
    const allTypes: string[] = tickets.map(({ type_name }: any): any => type_name)
    const data: any = {}
    allTypes.forEach((item: string): any => {
      data[item] = (data[item] || 0) + 1
    })
    return {
      labels: Object.keys(data),
      datasets: [{
        order: 1,
        data: Object.values(data),
        backgroundColor: ['#ff4b49', '#ff5a49', '#ff6949', '#ff7849', '#ff8749', '#ff9649', '#ffa649']
      }]
    }
  }

  const ticketsDepartaments = (): ChartData => {
    const allTypes: string[] = tickets.map(({ departament_name }: any): any => departament_name)
    const data: any = {}
    allTypes.forEach((item: string): any => {
      data[item] = (data[item] || 0) + 1
    })
    return {
      labels: Object.keys(data),
      datasets: [{
        order: 1,
        data: Object.values(data),
        backgroundColor: ['#ff4b49', '#ff5a49', '#ff6949', '#ff7849', '#ff8749', '#ff9649', '#ffa649']
      }]
    }
  }

  const ticketsChannels = (): ChartData => {
    const allTypes: string[] = tickets.map(({ channel_name }: any): any => channel_name)
    const data: any = {}
    allTypes.forEach((item: string): any => {
      data[item] = (data[item] || 0) + 1
    })
    return {
      labels: Object.keys(data),
      datasets: [{
        order: 1,
        data: Object.values(data),
        backgroundColor: ['#ff4b49', '#ff5a49', '#ff6949', '#ff7849', '#ff8749', '#ff9649', '#ffa649']
      }]
    }
  }

  return loading ? <PageContentLoading /> : (
    <Content type="grid" gap margin cols={12}>
      <Column colStart={1} colEnd={3} rowStart={1} rowEnd={1}>
        <Card height="100%" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <FiInbox style={{ height: '2rem', strokeWidth: '0.1rem', width: 'auto' }} />
          <H4>0 mensagens na<br />caixa de entrada</H4>
        </Card>
      </Column>
      <Column colStart={4} colEnd={6} rowStart={1} rowEnd={1}>
        <Card height="100%" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <FiMessageCircle style={{ height: '2rem', strokeWidth: '0.1rem', width: 'auto' }} />
          <H4>{ticketsCount(1)} chamados<br />em aberto</H4>
        </Card>
      </Column>
      <Column colStart={7} colEnd={9} rowStart={1} rowEnd={1}>
        <Card height="100%" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <FiAlertCircle style={{ height: '2rem', strokeWidth: '0.1rem', width: 'auto' }} />
          <H4>{ticketsCount(4)} chamados<br />pendentes</H4>
        </Card>
      </Column>
      <Column colStart={10} colEnd={12} rowStart={1} rowEnd={1}>
        <Card height="100%" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <FiUser style={{ height: '2rem', strokeWidth: '0.1rem', width: 'auto' }} />
          <H4>{people?.people_count || 0} pessoas<br />cadastradas</H4>
        </Card>
      </Column>
      <Column colStart={1} colEnd={12} rowStart={2} rowEnd={2}>
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textTransform: 'uppercase' }}>
          <H2>Número total de chamados</H2>
          <Line height={80} data={ticketsMonth()} />
        </Card>
      </Column>
      <Column colStart={1} colEnd={4} rowStart={3} rowEnd={3}>
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textTransform: 'uppercase' }}>
          <H2>Tipos de chamados</H2>
          <Pie data={ticketsTypes()} />
        </Card>
      </Column>
      <Column colStart={5} colEnd={8} rowStart={3} rowEnd={3}>
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textTransform: 'uppercase' }}>
          <H2>Departamentos</H2>
          <Pie data={ticketsDepartaments()} />
        </Card>
      </Column>
      <Column colStart={9} colEnd={12} rowStart={3} rowEnd={3}>
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textTransform: 'uppercase' }}>
          <H2>Canais de contato</H2>
          <Pie data={ticketsChannels()} />
        </Card>
      </Column>
    </Content>
  )
}

export default DashboardPage
