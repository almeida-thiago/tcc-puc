import api from '@utils/api'
import { TicketStatus } from '@models/helpdesk'

const apiPath: string = `${process.env.REACT_APP_API_URL}/helpdesk/v1/tickets/status`

/**
 * Read one or all status
 * @param {string} [id] status id
 */
export const getTicketStatusList = (id: string = ''): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.get(`${apiPath}/${id}`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Insert new status
 * @param {TicketStatus} [data] data to insert
 */
export const insertTicketStatus = (data: TicketStatus): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.post(apiPath, data)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Update a status
 * @param {string} [id] status id
 * @param {TicketStatus} [data] data to update
 */
export const updateTicketStatus = (id: string, data: TicketStatus): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.put(`${apiPath}/${id}`, data)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Delete a ticket status
 * @param {string} [id] ticket status id
 */
export const deleteTicketStatus = (id: string): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.delete(`${apiPath}/${id}`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
