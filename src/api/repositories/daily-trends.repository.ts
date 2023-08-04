import { AxiosRequestConfig } from 'axios'
import { HttpClient } from '../http-client'
import { RequestWrapper } from '../interfaces/base'
import { DailyTrendsParams } from '../interfaces/params'

export class DailyTrendsRepository {
  private httpClient: HttpClient
  private URL = '/daily-trends'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async fetchDailyTrends<T, E>(params: DailyTrendsParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL,
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
}
