/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import { useHistory, useLocation } from 'react-router'
import { useRecaptcha } from 'react-recaptcha-hook'
import { LoginSocialGoogle } from 'reactjs-social-login'
import { setValueToFrom, setValueToInput, isInvalid, hasInvalidFields, FormFieldValue } from '@utils/form-helpers'
import { Google } from '@assets/vector-icons'
import Separator from '@components/separator'
import InputText from '@components/input-text'
import Button from '@components/button'
import { SignIn } from '@models/auth'
import { doLogin } from '@services/auth'
import { FormContainer, LoginButtonContainer } from '@pages/authentication/styles'
import LoginPageCard from '@pages/authentication/card'

type FormFields = {
  username: FormFieldValue;
  password: FormFieldValue;
}

const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { state } = useLocation<any>()
  const executeRecaptcha = useRecaptcha({ sitekey: process.env.REACT_APP_RECAPTCHA_KEY!, hideDefaultBadge: true });
  const [formFieldsData, setFormFieldsData] = useState<FormFields>()
  const [submiting, setSubmiting] = useState<boolean>(false)

  useEffect((): void => {
    setValueToFrom(setFormFieldsData, 'username', 'text', state?.username)
    setValueToFrom(setFormFieldsData, 'password', 'text', undefined)
  }, [])

  const loginHandler = async (): Promise<void> => {
    try {
      if (!executeRecaptcha) {
        throw new Error('recaptcha unvaliable')
      }
      const reacaptchaToken: string = await executeRecaptcha('execute')
      await loginAction(reacaptchaToken)
    } catch (error) {
      console.error('login error - recaptcha', ' | ', error)
    }
  }

  const loginAction = async (recaptchaToken: string): Promise<void> => {
    try {
      if (
        !formFieldsData ||
        hasInvalidFields([
          { field: 'username', empty: false },
          { field: 'password', empty: false }
        ], formFieldsData, setFormFieldsData)
      ) {
        dispatch(addAlert({
          time: 5000,
          style: 'warning',
          title: 'Dados inválidos',
          message: `Verifique os dados infomados e tente novamente. Os campos marcados com * (asterisco) são de preenchimento obrigatório.`
        }))
      } else {
        const loginData: SignIn = {
          recaptchaToken,
          username: formFieldsData.username.value,
          password: formFieldsData.password.value
        }
        setSubmiting(true)
        await doLogin(loginData)
        history.replace('/')
      }
    } catch (error) {
      setValueToFrom(setFormFieldsData, 'password', 'text', '')
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao realizar login',
        message: `Verifique o usuário e senha informados e tente novamente.`
      }))
    } finally {
      setSubmiting(false)
    }
  }

  const googleAuthentication = async (googleUser: any): Promise<void> => {
    try {
      const loginData: SignIn = {
        accessToken: googleUser.data.Zb.id_token,
        service: 'google'
      }
      setSubmiting(true)
      await doLogin(loginData)
      history.replace('/')
    } catch (error) {
      googleAuthenticationError()
    } finally {
      setSubmiting(false)
    }
  }

  const googleAuthenticationError = (): void => {
    dispatch(addAlert({
      style: 'danger',
      title: 'Erro ao realizar login',
      message: `Não foi possível realizar o login com o Google.`
    }))
  }

  return (
    <LoginPageCard title="Bem vindo de volta!">
      <FormContainer>
        <InputText
          required
          block
          label="Login"
          name="username"
          getValue={
            (name: string, value: string | number) =>
              setValueToFrom(setFormFieldsData, name, 'username', value)
          }
          setValue={setValueToInput(formFieldsData, 'username')}
          invalid={isInvalid(formFieldsData, 'username')}
          disabled={submiting}
          maxLength={250}
        />
        <InputText
          block
          password
          required
          label="Senha"
          name="password"
          getValue={
            (name: string, value: string | number) =>
              setValueToFrom(setFormFieldsData, name, 'password', value)
          }
          setValue={setValueToInput(formFieldsData, 'password')}
          invalid={isInvalid(formFieldsData, 'password')}
          disabled={submiting}
          maxLength={250}
        />
        <Button color="primary" noMargin onClick={loginHandler} loading={submiting}>Entrar</Button>
        <LoginButtonContainer>
          <Button flat block noMargin onClick={() => history.push('/sign-up')}>Criar conta</Button>
          <Button flat block noMargin onClick={() => history.push('/forgot-password', { username: formFieldsData?.username.value })}>Esqueceu a senha?</Button>
        </LoginButtonContainer>
        <Separator style={{ marginBottom: '0.5rem' }} >ou</Separator>
        <LoginSocialGoogle
          client_id={process.env.REACT_APP_GOOGLE_LOGIN_ID || ''}
          onResolve={googleAuthentication}
          onReject={googleAuthenticationError}
        >
          <Button block noMargin className="google" loading={submiting}><Google />Entrar com Google</Button>
        </LoginSocialGoogle>
      </FormContainer>
    </LoginPageCard>

  )
}

export default LoginPage
