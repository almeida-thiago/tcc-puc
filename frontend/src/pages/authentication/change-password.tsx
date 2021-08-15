import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import { useHistory, useLocation } from 'react-router'
import { useRecaptcha } from 'react-recaptcha-hook'
import { setValueToFrom, setValueToInput, isInvalid, hasInvalidFields, FormFieldValue, maskInput } from '@utils/form-helpers'
import InputText from '@components/input-text'
import Button from '@components/button'
import { ChangePassword } from '@models/auth'
import { changePassword } from '@services/auth'
import { FormContainer } from '@pages/authentication/styles'
import ChangePasswordPageCard from '@pages/authentication/card'

type FormFields = {
  secret_code: FormFieldValue;
  password: FormFieldValue;
  passwordConfirm: FormFieldValue;
}

const ChangePasswordPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { state } = useLocation<any>()
  const executeRecaptcha = useRecaptcha({ sitekey: process.env.REACT_APP_RECAPTCHA_KEY!, hideDefaultBadge: true });
  const [submiting, setSubmiting] = useState<boolean>(false)
  const [formFieldsData, setFormFieldsData] = useState<FormFields>()

  useEffect(() => {
    setValueToFrom(setFormFieldsData, 'secret_code', 'number', undefined)
    setValueToFrom(setFormFieldsData, 'password', 'text', undefined)
    setValueToFrom(setFormFieldsData, 'passwordConfirm', 'text', undefined)
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
          { field: 'secret_code', empty: false },
          { field: 'password', empty: false },
          { field: 'passwordConfirm', empty: false }
        ], formFieldsData, setFormFieldsData)
      ) {
        dispatch(addAlert({
          time: 5000,
          style: 'warning',
          title: 'Dados inválidos',
          message: `Verifique os dados infomados e tente novamente. Os campos marcados com * (asterisco) são de preenchimento obrigatório.`
        }))
      } else {
        const forgotData: ChangePassword = {
          recaptchaToken,
          username: state?.username,
          password: formFieldsData.password.value,
          secret_code: formFieldsData.secret_code.value
        }
        setSubmiting(true)
        await changePassword(forgotData)
        history.replace('/sign-in')
      }
    } catch (error) {
      setValueToFrom(setFormFieldsData, 'secret_code', 'number', '')
      setValueToFrom(setFormFieldsData, 'password', 'text', '')
      setValueToFrom(setFormFieldsData, 'passwordConfirm', 'text', '')
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao cadastrar nova senha',
        message: `Verifique os dados informados informados e tente novamente.`
      }))
    } finally {
      setSubmiting(false)
    }
  }

  return (
    <ChangePasswordPageCard title="Cadastrar nova senha">
      <FormContainer>
        <InputText
          required
          block
          className="code"
          label="Código de verificação"
          name="secret_code"
          getValue={
            (name: string, value: string | number) =>
              setValueToFrom(setFormFieldsData, name, 'secret_code', maskInput(value, 'numbers'))
          }
          setValue={setValueToInput(formFieldsData, 'secret_code')}
          invalid={isInvalid(formFieldsData, 'secret_code')}
          disabled={submiting}
          placeholder="000000"
          maxLength={6}
        />
        <InputText
          block
          password
          required
          label="Nova senha"
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
          name="passwordConfirm"
          getValue={
            (name: string, value: string | number) =>
              setValueToFrom(setFormFieldsData, name, 'passwordConfirm', value)
          }
          setValue={setValueToInput(formFieldsData, 'passwordConfirm')}
          invalid={isInvalid(formFieldsData, 'passwordConfirm')}
          disabled={submiting}
          maxLength={250}
        />
        <Button color="primary" noMargin onClick={forgotHandler} loading={submiting}>Salvar nova senha</Button>
      </FormContainer>
    </ChangePasswordPageCard>
  )
}

export default ChangePasswordPage
