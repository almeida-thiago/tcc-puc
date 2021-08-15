import api from '@utils/api'
import { User } from '@models/user'

const apiPath: string = `${process.env.REACT_APP_API_URL}/auth/v1/users`

/**
 * Read one user or all users
 * @param {string} [id] user id
 */
export const getUsersList = (id: string = ''): Promise<void> => {
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
 * Insert new user
 * @param {User} [data] data to insert
 */
export const insertUser = (data: User): Promise<void> => {
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
 * Update a user
 * @param {string} [id] user id
 * @param {User} [data] data to update
 */
export const updateUser = (id: string, data: User): Promise<void> => {
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
 * Delete a user
 * @param {string} [id] user id
 */
export const deleteUser = (id: string): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.delete(`${apiPath}/${id}`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
