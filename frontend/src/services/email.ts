import { EmailSettings } from '@models/email'
import api from '@utils/api'

const apiPath: string = `${process.env.REACT_APP_API_URL}/third/v1/email`

/**
 * Get all e-mails inbox messages
 */
export const getEmailsInboxList = (): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.get(apiPath)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Delete an e-mail
 * @param {string} [id] e-mail id
 */
export const deleteEmail = (id: string): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.delete(`${apiPath}/${id}`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Read app e-mail settings
 */
export const getEmailSettings = (): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.get(`${apiPath}/settings`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Update applications e-mail settings
 * @param {EmailSettings} [data] e-mail settings to update
 */
export const updateEmailSettings = (data: EmailSettings): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.put(`${apiPath}/settings`, data)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Check if have unseen e-mails inbox
 */
export const checkUnseenEmails = (): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.get(`${apiPath}/unseen`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
