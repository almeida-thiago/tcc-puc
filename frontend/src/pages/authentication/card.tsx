import React from 'react'
import { Logo, CaptionContainer, Discaimer } from '@pages/authentication/styles'
import { Content } from '@components/layout'
import Card from '@components/card'
import { H1 } from '@components/typography'
import { LoginPageProps } from '@pages/authentication/models'

const PageLoginCard = ({ title, children }: LoginPageProps): JSX.Element =>
(
  <Content type="flex" centerContent style={{ padding: '1rem' }}>
    <Card width="30vw" minWidth="390px">
      <CaptionContainer>
        <Logo src="https://www.kodit.com.br/logo.svg" alt="logo" />
        <H1>{title}</H1>
      </CaptionContainer>
      {children}
    </Card>
    <Discaimer>
      Este site é protegido pelo reCAPTCHA e o <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacidade &amp; Termos</a> e <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Termos de Serviço</a> se aplicam.<br />
      © 2021 Kodit Tecnologia - LOREM IPSUM DOLOR LTDA.
    </Discaimer>
  </Content>
)

export default PageLoginCard
