//since render free instance go down after 15 minutes of inactivity we need to send a request every 14 minutes to keep it alive
import { AxiosRequestConfig } from 'axios'
import { HttpClient } from '../http-client'
import { RequestWrapper } from '../interfaces/base'

export class BarrierRepository {
  private httpClient: HttpClient
  private URL = '/'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }
  async fetchBarrier<T, E>(): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL
    }

    return await this.httpClient.request<T, E>(config)
  }
}
