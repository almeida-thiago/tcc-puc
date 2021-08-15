import api from '@utils/api'
import { Permission } from '@models/user'

const apiPath: string = `${process.env.REACT_APP_API_URL}/auth/v1/users/permissions`

/**
 * Read one permission or all permissions
 * @param {string} [id] permission id
 */
export const getPermissionsList = (id: string = ''): Promise<void> => {
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
 * Insert new permission
 * @param {Permission} [data] data to insert
 */
export const insertPermission = (data: Permission): Promise<void> => {
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
 * Update a permission
 * @param {string} [id] permission id
 * @param {Permission} [data] data to update
 */
export const updatePermission = (id: string, data: Permission): Promise<void> => {
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
 * Delete a permission
 * @param {string} [id] permission id
 */
export const deletePermission = (id: string): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.delete(`${apiPath}/${id}`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
