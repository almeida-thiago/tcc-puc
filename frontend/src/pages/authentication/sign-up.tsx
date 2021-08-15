import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRecaptcha } from 'react-recaptcha-hook'
import { addAlert } from '@store/alerts'
import { useHistory } from 'react-router'
import { setValueToFrom, setValueToInput, isInvalid, hasInvalidFields, FormFieldValue, maskInput } from '@utils/form-helpers'
import InputText from '@components/input-text'
import Button from '@components/button'
import { SignUp } from '@models/auth'
import { doSignUp } from '@services/auth'
import { FormContainer } from '@pages/authentication/styles'
import LoginPageCard from '@pages/authentication/card'

type FormFields = {
  name: FormFieldValue;
  email: FormFieldValue;
  phone_number: FormFieldValue;
  username: FormFieldValue;
  password: FormFieldValue;
  password_confirm: FormFieldValue;
}

const CreateUserPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const history = useHistory()
  const executeRecaptcha = useRecaptcha({ sitekey: process.env.REACT_APP_RECAPTCHA_KEY!, hideDefaultBadge: true });
  const [formFieldsData, setFormFieldsData] = useState<FormFields>()
  const [submiting, setSubmiting] = useState<boolean>(false)

  useEffect((): void => {
    setValueToFrom(setFormFieldsData, 'name', 'text', undefined)
    setValueToFrom(setFormFieldsData, 'email', 'email', undefined)
    setValueToFrom(setFormFieldsData, 'phone_number', 'phone', undefined)
    setValueToFrom(setFormFieldsData, 'username', 'text', undefined)
    setValueToFrom(setFormFieldsData, 'password', 'text', undefined)
    setValueToFrom(setFormFieldsData, 'password_confirm', 'text', undefined)
  }, [])

  const createHandler = async (): Promise<void> => {
    try {
      if (!executeRecaptcha) {
        throw new Error('recaptcha unvaliable')
      }
      const reacaptchaToken: string = await executeRecaptcha('execute')
      await createAction(reacaptchaToken)
    } catch (error) {
      console.error('login error - recaptcha', ' | ', error)
    }
  }

  const createAction = async (recaptchaToken: string): Promise<void> => {
    try {
      if (
        !formFieldsData ||
        hasInvalidFields([
          { field: 'name', empty: false },
          { field: 'email', empty: false, format: 'email' },
          { field: 'phone_number', empty: true, format: 'phone' },
          { field: 'username', empty: false },
          { field: 'password', empty: false },
          { field: 'password_confirm', empty: false }
        ], formFieldsData, setFormFieldsData) ||
        formFieldsData.password.value !== formFieldsData.password_confirm.value
      ) {
        dispatch(addAlert({
          time: 5000,
          style: 'warning',
          title: 'Dados inválidos',
          message: `Verifique os dados infomados e tente novamente. Os campos marcados com * (asterisco) são de preenchimento obrigatório.`
        }))
      } else {
        const signUpData: SignUp = {
          recaptchaToken,
          name: formFieldsData.name.value,
          email: formFieldsData.email.value,
          phone_number: parseInt(formFieldsData.phone_number.value),
          username: formFieldsData.username.value,
          password: formFieldsData.password.value
        }
        setSubmiting(true)
        await doSignUp(signUpData)
        history.replace('/sign-in', { username: formFieldsData.username.value })
      }
    } catch (error) {
      setValueToFrom(setFormFieldsData, 'password', 'text', '')
      setValueToFrom(setFormFieldsData, 'password_confirm', 'text', '')
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao realizar login',
        message: `Verifique o usuário e senha informados e tente novamente.`
      }))
    } finally {
      setSubmiting(false)
    }
  }

  return (
    <LoginPageCard title="Cadastre-se">
      <FormContainer>
        <InputText
          required
          block
          label="Nome"
          name="name"
          getValue={
            (name: string, value: string | number) =>
              setValueToFrom(setFormFieldsData, name, 'text', value)
          }
          setValue={setValueToInput(formFieldsData, 'name')}
          invalid={isInvalid(formFieldsData, 'name')}
          disabled={submiting}
          maxLength={250}
        />
        <InputText
          required
          block
          label="E-mail"
          name="email"
          getValue={
            (name: string, value: string | number) =>
              setValueToFrom(setFormFieldsData, name, 'email', value)
          }
          setValue={setValueToInput(formFieldsData, 'email')}
          invalid={isInvalid(formFieldsData, 'email')}
          disabled={submiting}
          placeholder="nome@servidor.com"
          maxLength={250}
        />
        <InputText
          block
          label="Telefone"
          name="phone_number"
          getValue={
            (name: string, value: string | number) =>
              setValueToFrom(setFormFieldsData, name, 'phone', maskInput(value, 'phone'))
          }
          setValue={setValueToInput(formFieldsData, 'phone_number')}
          invalid={isInvalid(formFieldsData, 'phone_number')}
          disabled={submiting}
          placeholder="(00) 0000-0000"
          maxLength={15}
        />
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
        <InputText
          block
          password
          required
          label="Confirme a nova senha"
          name="password_confirm"
          getValue={
            (name: string, value: string | number) =>
              setValueToFrom(setFormFieldsData, name, 'password_confirm', value)
          }
          setValue={setValueToInput(formFieldsData, 'password_confirm')}
          invalid={isInvalid(formFieldsData, 'password_confirm')}
          disabled={submiting}
          maxLength={250}
        />
        <Button color="primary" noMargin onClick={createHandler} loading={submiting}>Criar conta</Button>
        <Button flat block noMargin onClick={() => history.goBack()}>Voltar</Button>
      </FormContainer>
    </LoginPageCard>

  )
}

export default CreateUserPage
