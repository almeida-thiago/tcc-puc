import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAlert } from '@store/alerts'
import { setValueToFrom, setValueToInput, isInvalid, hasInvalidFields, FormFieldValue } from '@utils/form-helpers'
import { Content, Column } from '@components/layout'
import Modal from '@components/modal'
import InputText from '@components/input-text'
import Button from '@components/button'
import { EmailSettings } from '@models/email'
import { getEmailSettings, updateEmailSettings } from '@services/email'

type SettingsModalProps = {
  showModal: boolean;
  setShowModal: Function;
}

type FormFields = {
  email_imap_host: FormFieldValue;
  email_imap_port: FormFieldValue;
  email_smtp_host: FormFieldValue;
  email_smtp_port: FormFieldValue;
  email_user: FormFieldValue;
  email_password: FormFieldValue;
}

const SettingsFormModal = ({ setShowModal, showModal }: SettingsModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const [formFieldsData, setFormFieldsData] = useState<FormFields>()

  useEffect(() => {
    getDataHandler()
  }, [])

  const getDataHandler = async (): Promise<void> => {
    try {
      setLoading(true)
      const payload: any = await getEmailSettings()
      setValueToFrom(setFormFieldsData, 'email_imap_host', 'text', payload.email_imap_host)
      setValueToFrom(setFormFieldsData, 'email_imap_port', 'number', payload.email_imap_port)
      setValueToFrom(setFormFieldsData, 'email_smtp_host', 'text', payload.email_smtp_host)
      setValueToFrom(setFormFieldsData, 'email_smtp_port', 'number', payload.email_smtp_port)
      setValueToFrom(setFormFieldsData, 'email_user', 'email', payload.email_user)
      setValueToFrom(setFormFieldsData, 'email_password', 'text', payload.email_password)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateDataHandler = async (): Promise<void> => {
    try {
      if (
        !formFieldsData ||
        hasInvalidFields([
          { field: 'email_imap_host', empty: false },
          { field: 'email_imap_port', empty: false, format: 'number' },
          { field: 'email_smtp_host', empty: false },
          { field: 'email_smtp_port', empty: false, format: 'number' },
          { field: 'email_user', empty: false, format: 'email' },
          { field: 'email_password', empty: false }
        ], formFieldsData, setFormFieldsData)
      ) {
        dispatch(addAlert({
          time: 5000,
          style: 'warning',
          title: 'Dados inválidos',
          message: `Verifique os dados infomados e tente novamente. Os campos marcados com * (asterisco) são de preenchimento obrigatório.`
        }))
        return
      }
      const updateData: EmailSettings = {
        email_imap_host: formFieldsData.email_imap_host.value,
        email_imap_port: parseInt(formFieldsData.email_imap_port.value),
        email_smtp_host: formFieldsData.email_smtp_host.value,
        email_smtp_port: parseInt(formFieldsData.email_smtp_port.value),
        email_user: formFieldsData.email_user.value,
        email_password: formFieldsData.email_password.value
      }
      setLoading(true)
      await updateEmailSettings(updateData)
      dispatch(addAlert({
        style: 'success',
        title: 'Configurações alteradas',
        message: `As configurações foram alteradas.`
      }))

    } catch (error) {
      dispatch(addAlert({
        style: 'danger',
        title: 'Erro ao alterar as configurações',
        message: `As configurações não foram alterada, tente novamente.`
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Configurações"
      show={showModal}
      showAction={setShowModal}
    >
      <Content type="flex">
        <div style={{ flex: 1 }}>
          <Content type="grid" cols={4} rows={2} gap >
            <Column rowStart={1} rowEnd={1} colStart={1} colEnd={3}>
              <InputText
                block
                required
                label="Servidor imap do e-mail"
                name="email_imap_host"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'text', value)
                }
                setValue={setValueToInput(formFieldsData, 'email_imap_host')}
                invalid={isInvalid(formFieldsData, 'email_imap_host')}
                disabled={loading}
                maxLength={250}
              />
            </Column>
            <Column rowStart={1} rowEnd={1} colStart={4} colEnd={4}>
              <InputText
                block
                required
                label="Porta imap do e-mail"
                name="email_imap_port"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'number', value)
                }
                setValue={setValueToInput(formFieldsData, 'email_imap_port')}
                invalid={isInvalid(formFieldsData, 'email_imap_port')}
                disabled={loading}
                maxLength={5}
              />
            </Column>
            <Column rowStart={2} rowEnd={2} colStart={1} colEnd={3}>
              <InputText
                block
                required
                label="Servidor smtp do e-mail"
                name="email_smtp_host"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'text', value)
                }
                setValue={setValueToInput(formFieldsData, 'email_smtp_host')}
                invalid={isInvalid(formFieldsData, 'email_smtp_host')}
                disabled={loading}
                maxLength={250}
              />
            </Column>
            <Column rowStart={2} rowEnd={2} colStart={4} colEnd={4}>
              <InputText
                block
                required
                label="Porta smtp do e-mail"
                name="email_smtp_port"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'number', value)
                }
                setValue={setValueToInput(formFieldsData, 'email_smtp_port')}
                invalid={isInvalid(formFieldsData, 'email_smtp_port')}
                disabled={loading}
                maxLength={5}
              />
            </Column>
            <Column rowStart={3} rowEnd={3} colStart={1} colEnd={2}>
              <InputText
                block
                required
                label="E-mail"
                name="email_user"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'email', value)
                }
                setValue={setValueToInput(formFieldsData, 'email_user')}
                invalid={isInvalid(formFieldsData, 'email_user')}
                disabled={loading}
                maxLength={250}
              />
            </Column>
            <Column rowStart={3} rowEnd={3} colStart={3} colEnd={4}>
              <InputText
                block
                password
                required
                label="Senha do e-mail"
                name="email_password"
                getValue={
                  (name: string, value: string | number) =>
                    setValueToFrom(setFormFieldsData, name, 'text', value)}
                setValue={setValueToInput(formFieldsData, 'email_password')
                }
                invalid={isInvalid(formFieldsData, 'email_password')}
                disabled={loading}
                maxLength={120}
              />
            </Column>
          </Content>
        </div>
        <Button
          noMargin
          color="primary"
          textColor="clear"
          onClick={updateDataHandler}
          loading={loading}
        >Salvar</Button>
      </Content>
    </Modal>
  )
}

export default SettingsFormModal
