import { decode, verify, sign } from 'jsonwebtoken'
import api from '@utils/api'
import { ChangePassword, ForgotPassword, SignUp, SignIn, Token } from '@models/auth'
import store from '@store/index'
import { setLoggedUser, clearLoggedUser } from '@store/user'
import { LoggedUser } from '@models/user'

const apiPath: string = `${process.env.REACT_APP_API_URL}/auth/v1`
const appKey: string = `@${(process.env.REACT_APP_KEY || 'app_key').toUpperCase()}`

/**
 * Sign-up user
 * @param {SignUp} [data] data to login
 */
 export const doSignUp = (data: SignUp): Promise<any> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      await api.post(`${apiPath}/users/sign-up`, data)
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Login user
 * @param {SignIn} [data] data to login
 */
export const doLogin = (data: SignIn): Promise<any> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const { token }: any = await api.post(`${apiPath}/sign-in`, data)
      const tokenData: Token | undefined = await storeToken(token)
      delete tokenData!.iat
      delete tokenData!.exp
      store.dispatch(setLoggedUser({ ...tokenData, token }))
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Logout user
 * @returns true or false
 */
export const doLogout = (): Promise<any> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      await removeTokenFromLocalStorage()
      store.dispatch(clearLoggedUser())
      resolve(true)
    } catch (error) {
      reject(false)
    }
  })
}

/**
 * Forgot password
 * @param {ForgotPassword} [data] data to retrive code
 * @returns true or false
 */
 export const forgotPassword = (data: ForgotPassword): Promise<any> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      await api.post(`${apiPath}/forgot-password`, data)
      resolve(true)
    } catch (error) {
      reject(false)
    }
  })
}

/**
 * Change password
 * @param {ChangePassword} [data] data to change password
 * @returns true or false
 */
 export const changePassword = (data: ChangePassword): Promise<any> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      await api.post(`${apiPath}/change-password`, data)
      resolve(true)
    } catch (error) {
      reject(false)
    }
  })
}

/**
 * Save token in storage
 * @param {string} token token
 */
const storeToken = async (token: string): Promise<Token | undefined> => {
  try {
    await storeTokenToLocalStorage(token)
    const tokenData: Token = await readTokenFromLocalStorage()
    return tokenData
  } catch (error) {
    return undefined
  }
}

/**
 * Is access allowed by token
 * @param {string[]} rules permission rules to verify
 * @returns true or false
 */
export const isAccessAllowed = (rules: number[] = []): boolean => {
  try {
    const { permission_level }: LoggedUser = store.getState().user
    if (!rules.length) {
      return true
    }
    if (rules.length && !isNaN(permission_level!)) {
      return rules.includes(permission_level!)
    }
    return false
  } catch (error) {
    return false
  }
}

/**
 * Check if token session is valid
 * @returns true or false
 */
export const isTokenValid = (): boolean => {
  try {
    const token: string | undefined = store.getState().user.token
    const secret: string | undefined = process.env.REACT_APP_TOKEN_KEY
    if (token && secret && verify(token, secret)) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

/**
 * Store token in local storage
 * @param {string} value token to store
 * @returns {boolean} true or error
 */
const storeTokenToLocalStorage = async (value: string): Promise<any> =>
  new Promise(async (resolve, reject): Promise<void> => {
    try {
      localStorage.setItem(appKey, value)
      const tokenData: any = decode(value)
      resolve(tokenData)
    } catch (error) {
      reject(error)
    }
  })

/**
* Read token from local storage
* @param {string} [response] reponse data (decoded or full)
* @returns {string} value or error
*/
export const readTokenFromLocalStorage = async (response: string = 'decoded'): Promise<any> =>
  new Promise(async (resolve, reject): Promise<void> => {
    try {
      const dataFromLocalStorage: string | null = localStorage.getItem(appKey)
      if (!dataFromLocalStorage) {
        resolve(null)
      } else if (response === 'decoded') {
        const tokenData: any = decode(dataFromLocalStorage)
        resolve(tokenData)
      } else if (response === 'full') {
        const tokenData: any = decode(dataFromLocalStorage)
        resolve({ ...tokenData, token: dataFromLocalStorage })
      } else {
        resolve(dataFromLocalStorage)
      }
    } catch (error) {
      reject(error)
    }
  })

/**
* Remove data from local storage
* @returns {boolean} true or error
*/
const removeTokenFromLocalStorage = async (): Promise<boolean> =>
  new Promise(async (resolve, reject): Promise<void> => {
    try {
      localStorage.removeItem(appKey)
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })

/**
 * Renew token
 */
export const renewToken = (): Promise<any> => {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const token: string | undefined = store.getState().user.token
      const secret: string | undefined = process.env.REACT_APP_TOKEN_KEY
      if (token && secret && !isTokenValid()) {
        const tokenData: any = decode(token)
        delete tokenData.iat
        delete tokenData.exp
        const newToken: string = sign(tokenData, secret)
        await storeToken(newToken)
        store.dispatch(setLoggedUser({ ...tokenData, token: newToken }))
        resolve(true)
      }
      resolve(true)
    } catch (error) {
      reject(false)
    }
  })
}
