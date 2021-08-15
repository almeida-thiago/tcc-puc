import api from '@utils/api'
import { Channel } from '@models/helpdesk'

const apiPath: string = `${process.env.REACT_APP_API_URL}/helpdesk/v1/channels`

/**
 * Read one channel or all channels
 * @param {string} [id] channels id
 */
export const getChannelsList = (id: string = ''): Promise<void> => {
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
 * Insert new channel
 * @param {Channel} [data] data to insert
 */
export const insertChannel = (data: Channel): Promise<void> => {
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
 * Update a channels
 * @param {string} [id] channels id
 * @param {Channel} [data] data to update
 */
export const updateChannel = (id: string, data: Channel): Promise<void> => {
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
 * Delete a channel
 * @param {string} [id] channel id
 */
export const deleteChannel = (id: string): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.delete(`${apiPath}/${id}`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
