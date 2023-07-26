import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestWrapper } from '../interfaces'
import { to } from '../utils'

export class HttpClient {
  private API_BASE_URL = 'http://localhost:3000'
  private axios: AxiosInstance

  constructor() {
    this.axios = this.createAxiosInstance()
  }

  private createAxiosInstance(): AxiosInstance {
    const axiosInstance = axios.create({ baseURL: this.API_BASE_URL })

    const onRequestFulFilled = (config: AxiosRequestConfig): AxiosRequestConfig => {
      const token = localStorage.getItem('token')
      if (token) config.headers['auth-token'] = token

      return config
    }

    const onRequestRejected = (error: any): any => {
      return Promise.reject(error)
    }

    axiosInstance.interceptors.request.use(onRequestFulFilled, onRequestRejected)

    return axiosInstance
  }

  async request<T, E>(config: AxiosRequestConfig): Promise<RequestWrapper<T, E>> {
    const req = this.axios.request(config)

    const [err, res] = await to<AxiosResponse<T>, AxiosError<E>>(req)

    return { err, res }
  }
}
