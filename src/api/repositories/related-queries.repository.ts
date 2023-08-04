import { AxiosRequestConfig } from 'axios'
import { HttpClient } from '../http-client'
import { RequestWrapper } from '../interfaces/base'
import { RelatedQueriesParams } from '../interfaces/params'

export class RelatedQueriesRepository {
  private httpClient: HttpClient
  private URL = '/related-queries'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async fetchRelatedQueries<T, E>(params: RelatedQueriesParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL,
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
}
