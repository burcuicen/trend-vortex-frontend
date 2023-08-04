import { AxiosRequestConfig } from 'axios'
import { HttpClient } from '../http-client'
import { RequestWrapper } from '../interfaces/base'
import { RelatedTopicsParams } from '../interfaces/params'

export class RelatedTopicsRepository {
  private httpClient: HttpClient
  private URL = '/related-topics'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async fetchRelatedTopics<T, E>(params: RelatedTopicsParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL,
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
}
