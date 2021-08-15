import api from '@utils/api'
import { Ticket } from '@models/helpdesk'

const apiPath: string = `${process.env.REACT_APP_API_URL}/helpdesk/v1/tickets`

/**
 * Read one ticket or all tickets
 * @param {string} [id] person id
 */
export const getTicketsList = (id: string = ''): Promise<void> => {
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
 * Insert new tickey
 * @param {Ticket} [data] data to insert
 */
export const insertTicket = (data: Ticket): Promise<void> => {
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
 * Update a ticket
 * @param {string} [id] ticket id
 * @param {Ticket} [data] data to update
 */
export const updateTicket = (id: string, data: Ticket): Promise<void> => {
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
 * Delete a ticket
 * @param {string} [id] ticket id
 */
 export const deleteTicket = (id: string): Promise<void> => {
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
 * Read tickets info
 */
 export const getTicketsInfo = (): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.get(`${apiPath}/info`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
