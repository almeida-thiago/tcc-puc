import api from '@utils/api'
import { Person } from '@models/person'

const apiPath: string = `${process.env.REACT_APP_API_URL}/stakeholders/v1/people`

/**
 * Read one person or all people
 * @param {string} [id] person id
 */
export const getPeopleList = (id: string = ''): Promise<void> => {
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
 * Insert new person
 * @param {Person} [data] data to insert
 */
export const insertPerson = (data: Person): Promise<void> => {
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
 * Update a person
 * @param {string} [id] person id
 * @param {Person} [data] data to update
 */
export const updatePerson = (id: string, data: Person): Promise<void> => {
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
 * Delete a person
 * @param {string} [id] person id
 */
export const deletePerson = (id: string): Promise<void> => {
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
 * Read people info
 */
 export const getPeopleInfo = (): Promise<void> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const payload: any = await api.get(`${apiPath}/info`)
      resolve(payload)
    } catch (error) {
      reject(error)
    }
  })
}
