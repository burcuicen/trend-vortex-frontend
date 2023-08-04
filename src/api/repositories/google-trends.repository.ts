import { AxiosRequestConfig } from 'axios'
import { HttpClient } from '../http-client'
import { RequestWrapper } from '../interfaces/base'
import {
  DailyTrendsParams,
  InterestByRegionParams,
  InterestOverTimeParams,
  RealTimeParams,
  RelatedQueriesParams,
  RelatedTopicsParams
} from '../interfaces/params'

export class GoogleTrendsRepository {
  private httpClient: HttpClient
  private URL = '/api'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async fetchDailyTrends<T, E>(params: DailyTrendsParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL + '/daily-trends',
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
  async fetchInterestByRegion<T, E>(params: InterestByRegionParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL + '/interest-by-region',
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
  async fetchInterestOverTime<T, E>(params: InterestOverTimeParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL + '/interest-over-time',
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
  async fetchRealTimeData<T, E>(params: RealTimeParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL + '/real-time',
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
  async fetchRelatedQueries<T, E>(params: RelatedQueriesParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL + '/related-queries',
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
  async fetchRelatedTopics<T, E>(params: RelatedTopicsParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL + '/related-topics',
      params: params
    }

    return await this.httpClient.request<T, E>(config)
  }
}
