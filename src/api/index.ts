import { HttpClient } from './http-client'
import * as repositories from './repositories'

let __instance: TrendVortexAPI

export class TrendVortexAPI {
  private httpClient: HttpClient
  auth: repositories.AuthRepository
  googleTrends: repositories.GoogleTrendsRepository
  barrier: repositories.BarrierRepository

  constructor() {
    this.httpClient = new HttpClient()
    this.auth = new repositories.AuthRepository(this.httpClient)
    this.googleTrends = new repositories.GoogleTrendsRepository(this.httpClient)
    this.barrier = new repositories.BarrierRepository(this.httpClient)
  }
  static getInstance() {
    return __instance || (__instance = new TrendVortexAPI())
  }
}
