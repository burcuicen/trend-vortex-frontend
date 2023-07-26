import { HttpClient } from '../http-client'

export class AuthRepository {
  private httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }
}
