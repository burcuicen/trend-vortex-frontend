import { HttpClient } from './http-client'
import * as repositories from './repositories'

let __instance: TrendVortexAPI

export class TrendVortexAPI {
  private httpClient: HttpClient
  auth: repositories.AuthRepository
  dailyTrends: repositories.DailyTrendsRepository
  interestByRegion: repositories.InterestByRegionRepository
  interestOverTime: repositories.InterestOverTimeRepository
  realTime: repositories.RealTimeRepository
  relatedQueries: repositories.RelatedQueriesRepository
  relatedTopics: repositories.RelatedTopicsRepository

  constructor() {
    this.httpClient = new HttpClient()
    this.auth = new repositories.AuthRepository(this.httpClient)
    this.dailyTrends = new repositories.DailyTrendsRepository(this.httpClient)
    this.interestByRegion = new repositories.InterestByRegionRepository(this.httpClient)
    this.interestOverTime = new repositories.InterestOverTimeRepository(this.httpClient)
    this.realTime = new repositories.RealTimeRepository(this.httpClient)
    this.relatedQueries = new repositories.RelatedQueriesRepository(this.httpClient)
  }
  static getInstance() {
    return __instance || (__instance = new TrendVortexAPI())
  }
}
