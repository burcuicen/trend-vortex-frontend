import { AxiosRequestConfig } from 'axios'
import { HttpClient } from '../http-client'
import { RequestWrapper } from '../interfaces/base'
import { InterestOverTimeParams } from '../interfaces/params'

export class InterestOverTimeRepository {
  private httpClient: HttpClient
  private URL = '/interest-over-time'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async fetchInterestOverTime<T, E>(params: InterestOverTimeParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL,
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
}
