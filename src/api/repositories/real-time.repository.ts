import { AxiosRequestConfig } from 'axios'
import { HttpClient } from '../http-client'
import { RequestWrapper } from '../interfaces/base'
import { RealTimeParams } from '../interfaces/params'

export class RealTimeRepository {
  private httpClient: HttpClient
  private URL = '/real-time'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async fetchRealTimeData<T, E>(params: RealTimeParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL,
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
}
