import api from '@utils/api'
import { TicketType } from '@models/helpdesk'

const apiPath: string = `${process.env.REACT_APP_API_URL}/helpdesk/v1/tickets/types`

/**
 * Read one ticket type or all ticket types
 * @param {string} [id] ticket types id
 */
export const getTicketTypesList = (id: string = ''): Promise<void> => {
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
 * Insert new ticket type
 * @param {TicketType} [data] data to insert
 */
export const insertTicketType = (data: TicketType): Promise<void> => {
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
 * Update a ticket types
 * @param {string} [id] ticket types id
 * @param {TicketType} [data] data to update
 */
export const updateTicketType = (id: string, data: TicketType): Promise<void> => {
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
 * Delete a ticket type
 * @param {string} [id] ticket type id
 */
export const deleteTicketType = (id: string): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.delete(`${apiPath}/${id}`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
