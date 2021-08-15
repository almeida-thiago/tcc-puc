import React from 'react'
import { useHistory } from 'react-router-dom'
import { FiShield } from 'react-icons/fi'
import { PageContainer } from './styles'
import { H1, Paragraph } from '@components/typography'
import Button from '@components/button'

const PageAccessDenied = (): JSX.Element => {
  const history = useHistory()

  return (
    <PageContainer>
      <H1><FiShield />401. Acesso negado.</H1>
      <Paragraph> O nível de Permissão deste usuário não permite o acesso à página!</Paragraph>
      <Button onClick={() => history.replace('login')}>Fazer login com outro usuário</Button>
    </PageContainer>
  )
}

export default PageAccessDenied