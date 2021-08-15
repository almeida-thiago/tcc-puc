import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '@store/index'
import { addAlert } from '@store/alerts'
import { LoggedUser } from '@models/user'
import { renewToken } from '@services/auth'

type ApiResponse = {
  success: boolean;
  payload?: any;
  error?: {
    code: string;
    message: string;
    details: string;
  }
}

const api: AxiosInstance = axios.create({
  baseURL: `//${process.env.API_URL}`
})

api.interceptors.request.use(async (request: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  await renewToken()
  const { token, person_id, permission_level }: LoggedUser = store.getState().user
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  if (permission_level && permission_level >= 2) {
    request.params = { ...request.params, person_id }
  }
  return request
}, error => console.error(error.message))

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>): any | null => {
    if (response.status === 200 || 201) {
      return response.data.payload || true
    }
    throw new Error(response.data.error?.message)
  },
  error => {
    store.dispatch(addAlert({
      style: 'danger',
      title: 'Erro API',
      message: error.message
    }))
    return Promise.reject(error.message)
  }
)

export default api
