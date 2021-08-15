import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@components/button'
import { HelpdeskNav } from './styles'

const HelpdeskMenu = (): JSX.Element => {
  const history = useHistory()

  const setActive = (path: string): string =>
    history.location.pathname === path ? 'active' : ''

  return (
    <HelpdeskNav>
      <Button
        className={setActive('/helpdesk/inbox')}
        onClick={() => history.push('/helpdesk/inbox')}
      >Caixa de Entrada</Button>
      <Button
        className={setActive('/helpdesk')}
        onClick={() => history.push('/helpdesk')}
      >Chamados</Button>
      <Button
        className={setActive('/helpdesk/departaments')}
        onClick={() => history.push('/helpdesk/departaments')}
      >Departamentos</Button>
      <Button
        className={setActive('/helpdesk/types')}
        onClick={() => history.push('/helpdesk/types')}
      >Tipos de Chamados</Button>
      <Button
        className={setActive('/helpdesk/channels')}
        onClick={() => history.push('/helpdesk/channels')}
      >Canais de contato</Button>
      <Button
        className={setActive('/helpdesk/status')}
        onClick={() => history.push('/helpdesk/status')}
      >Status</Button>
    </HelpdeskNav>
  )
}

export default HelpdeskMenu
