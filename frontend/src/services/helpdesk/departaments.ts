import api from '@utils/api'
import { Departament } from '@models/helpdesk'

const apiPath: string = `${process.env.REACT_APP_API_URL}/helpdesk/v1/departaments`

/**
 * Read one departament or all departaments
 * @param {string} [id] departaments id
 */
export const getDepartamentsList = (id: string = ''): Promise<void> => {
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
 * Insert new departament
 * @param {Departament} [data] data to insert
 */
export const insertDepartament = (data: Departament): Promise<void> => {
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
 * Update a departaments
 * @param {string} [id] departaments id
 * @param {Departament} [data] data to update
 */
export const updateDepartament = (id: string, data: Departament): Promise<void> => {
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
 * Delete a departament
 * @param {string} [id] departament id
 */
export const deleteDepartament = (id: string): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.delete(`${apiPath}/${id}`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
