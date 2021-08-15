/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import { useHistory, useLocation } from 'react-router'
import { useRecaptcha } from 'react-recaptcha-hook'
import { setValueToFrom, setValueToInput, isInvalid, hasInvalidFields, FormFieldValue } from '@utils/form-helpers'
import InputText from '@components/input-text'
import Button from '@components/button'
import { ForgotPassword } from '@models/auth'
import { forgotPassword } from '@services/auth'
import { FormContainer } from '@pages/authentication/styles'
import ForgotPasswordPageCard from '@pages/authentication/card'

type FormFields = {
  username: FormFieldValue;
}

const ForgotPasswordPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { state } = useLocation<any>()
  const executeRecaptcha = useRecaptcha({ sitekey: process.env.REACT_APP_RECAPTCHA_KEY!, hideDefaultBadge: true });
  const [submiting, setSubmiting] = useState<boolean>(false)
  const [formFieldsData, setFormFieldsData] = useState<FormFields>()

  useEffect(() => {
    setValueToFrom(setFormFieldsData, 'username', 'text', state.username)
  }, [])

  const forgotHandler = async (): Promise<void> => {
    try {
      if (!executeRecaptcha) {
        throw new Error('recaptcha unvaliable')
      }
      const reacaptchaToken: string = await executeRecaptcha('execute')
      await forgot(reacaptchaToken)
    } catch (error) {
      console.error('login error - recaptcha', ' | ', error)
    }
  }

  const forgot = async (recaptchaToken: string): Promise<void> => {
    try {
      if (
        !formFieldsData ||
        hasInvalidFields([
          { field: 'username', empty: false }
        ], formFieldsData, setFormFieldsData)
      ) {
        dispatch(addAlert({
          time: 5000,
          style: 'warning',
          title: 'Dados inválidos',
          message: `Verifique os dados infomados e tente novamente. Os campos marcados com * (asterisco) são de preenchimento obrigatório.`
        }))
      } else {
        const forgotData: ForgotPassword = {
          recaptchaToken,
          username: formFieldsData.username.value,
          method: 'email'
        }
        setSubmiting(true)
        await forgotPassword(forgotData)
        history.replace('/change-password', { username: formFieldsData.username.value })
      }
    } catch (error) {
      setValueToFrom(setFormFieldsData, 'username', 'text', '')
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao realizar solicitar recuperação de senha',
        message: `Verifique o usuário informado e tente novamente.`
      }))
    } finally {
      setSubmiting(false)
    }
  }

  return (
    <ForgotPasswordPageCard title="Esqueceu a senha?">
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
        <Button color="primary" noMargin onClick={forgotHandler} loading={submiting}>Solicitar recuperação</Button>
        <Button flat block noMargin onClick={() => history.goBack()}>Voltar</Button>
      </FormContainer>
    </ForgotPasswordPageCard>
  )
}

export default ForgotPasswordPage
