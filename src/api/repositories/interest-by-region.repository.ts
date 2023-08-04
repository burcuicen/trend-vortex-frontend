import { AxiosRequestConfig } from 'axios'
import { HttpClient } from '../http-client'
import { RequestWrapper } from '../interfaces/base'
import { InterestByRegionParams } from '../interfaces/params'

export class InterestByRegionRepository {
  private httpClient: HttpClient
  private URL = '/interest-by-region'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async fetchInterestByRegion<T, E>(params: InterestByRegionParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL,
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
}
