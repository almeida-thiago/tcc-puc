import React from 'react'
import { useHistory } from 'react-router-dom'
import { FiAlertTriangle } from 'react-icons/fi'
import { PageContainer } from './styles'
import { H1, Paragraph } from '@components/typography'
import Button from '@components/button'

const PageNotFound = (): JSX.Element => {
  const history = useHistory()

  return (
    <PageContainer>
      <H1><FiAlertTriangle /> 404. Não foi possível encontrar essa página.</H1>
      <Paragraph> Mas não se preocupe, tudo aindo está no seu devido lugar!</Paragraph>
      <Button onClick={history.goBack}>Voltar para página anterior</Button>
    </PageContainer>
  )
}

export default PageNotFound