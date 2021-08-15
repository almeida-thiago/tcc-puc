import React, { useState, useEffect } from 'react'
import { Suspense, lazy } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { FiMessageCircle, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi'
import { ProtectedRoute, protectedValue, protectedAction } from '@utils/security'
import { PageLayout, PageContentLoading } from '@components/layout'
import SettingsFormModal from '@pages/settings'
import { doLogout } from '@services/auth'
import { checkUnseenEmails } from '@services/email'

const NotFound = lazy(() => import('@pages/not-found'))
const Dashboard = lazy(() => import('@pages/dashboard'))
const Users = lazy(() => import('@pages/users'))
const People = lazy(() => import('@pages/people'))
const Helpdesk = lazy(() => import('@pages/helpdesk'))
const HelpdeskStatus = lazy(() => import('@pages/helpdesk/status'))
const HelpdeskTicketTypes = lazy(() => import('@pages/helpdesk/types'))
const HelpdeskDepartaments = lazy(() => import('@pages/helpdesk/departaments'))
const HelpdeskChannels = lazy(() => import('@pages/helpdesk/channels'))
const HelpdeskInbox = lazy(() => import('@pages/helpdesk/inbox'))

const PageHome = (): JSX.Element => {
  const history = useHistory()
  const [showMenu, setShowMenu] = useState<boolean>(true)
  const [showModalSettings, setShowModalSettings] = useState<boolean>(false)
  const [notificationsList, setNotificationsList] = useState<any[]>([])
  const [haveNewMail, setHaveNewMail] = useState<boolean>(false)

  useEffect(() => {
    if (protectedAction([0, 1, 2, 3, 4, 5])) {
      checkUnseenMails()
      setInterval((): void => { checkUnseenMails() }, (5 * 60000))
    }
  }, [])

  useEffect((): void => {
    if (haveNewMail) {
      setNotificationsList((old: any) => [...old, {
        title: 'Novo e-mail',
        message: 'Há e-mails não lidos na caixa de entrada.',
        page: '/helpdesk/inbox'
      }])
    }
  }, [haveNewMail])

  const checkUnseenMails = (): void => {
    checkUnseenEmails()
      .then((result: any): void => {
        setHaveNewMail(result)
      })
  }

  return (
    <PageLayout
      logo="https://www.kodit.com.br/logo.svg"
      menuState={showMenu}
      menuActionHandler={setShowMenu}
      notifications={notificationsList}
      menuTop={[
        {
          label: 'Configurações',
          icon: <FiSettings />,
          disabled: protectedValue({ permission: [0], protectedValue: false, defaultValue: true }),
          subItem: [{
            label: 'Usuários',
            action: () => history.push('/users')
          }, {
            label: 'Configurações',
            action: () => setShowModalSettings(true)
          }]
        }, {
          label: 'Sair',
          icon: <FiLogOut />,
          action: () => doLogout().then(() => history.replace('/'))
        },
      ]}
      mainMenu={[
        {
          label: 'Pessoas',
          icon: <FiUsers />,
          disabled: protectedValue({ permission: [0, 1, 2, 3, 4, 5], protectedValue: false, defaultValue: true }),
          action: () => history.push('/people')
        }, {
          label: 'Helpdesk',
          icon: <FiMessageCircle />,
          action: () => history.push('/helpdesk')
        }
      ]}
    >
      <SettingsFormModal showModal={showModalSettings} setShowModal={setShowModalSettings} />
      <Suspense fallback={PageContentLoading}>
        <Switch>
        <ProtectedRoute
            exact
            path="/"
            permission={[]}
            component={Dashboard}
          />
          <ProtectedRoute
            exact
            path="/users"
            permission={[0]}
            component={Users}
          />
          <ProtectedRoute
            exact
            path="/people"
            permission={[0, 1, 2, 3, 4]}
            component={People}
          />
          <ProtectedRoute
            exact
            path="/helpdesk"
            permission={[]}
            component={Helpdesk}
          />
          <ProtectedRoute
            exact
            path="/helpdesk/status"
            permission={[0, 1, 2, 3, 4]}
            component={HelpdeskStatus}
          />
          <ProtectedRoute
            exact
            path="/helpdesk/types"
            permission={[0, 1, 2, 3, 4]}
            component={HelpdeskTicketTypes}
          />
          <ProtectedRoute
            exact
            path="/helpdesk/departaments"
            permission={[0, 1, 2, 3, 4]}
            component={HelpdeskDepartaments}
          />
          <ProtectedRoute
            exact
            path="/helpdesk/channels"
            permission={[0, 1, 2, 3, 4]}
            component={HelpdeskChannels}
          />
          <ProtectedRoute
            exact
            path="/helpdesk/inbox"
            permission={[0, 1, 2, 3, 4]}
            component={HelpdeskInbox}
          />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </PageLayout>
  )
}

export default PageHome
