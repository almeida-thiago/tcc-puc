import api from '@utils/api'
import { TicketMessage } from '@models/helpdesk'

const apiPath: string = `${process.env.REACT_APP_API_URL}/helpdesk/v1/tickets/messages`

/**
 * Read one ticket message or all ticket messages
 * @param {string} [ticket] ticket id
 * @param {string} [id] message id
 */
export const getTicketsMessagesList = (ticket: string | null = null, id: string = ''): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.get(`${apiPath}/${id}`, { params: { ticket } })
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Insert new ticket message
 * @param {TicketMessage} [data] data to insert
 */
export const insertTicketMessage = (data: TicketMessage): Promise<void> => {
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
 * Update a ticket message
 * @param {string} [id] ticket message id
 * @param {TicketMessage} [data] data to update
 */
export const updateTicketMessage = (id: string, data: TicketMessage): Promise<void> => {
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
 * Delete a ticket message
 * @param {string} [id] ticket message id
 */
export const deleteTicketMessage = (id: string): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.delete(`${apiPath}/${id}`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
