import { AxiosRequestConfig } from 'axios'
import { HttpClient } from '../http-client'
import { RequestWrapper } from '../interfaces/base'
import { ILogin, ILoginResponse, IRegisterDto } from '../interfaces/auth'
import { IUser } from '../interfaces/user'

export class AuthRepository {
  private httpClient: HttpClient
  private URL = '/auth'

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async login<T = ILoginResponse, E = unknown>(body: ILogin): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: this.URL + '/login',
      data: body
    }

    return await this.httpClient.request<T, E>(config)
  }

  async register<T = IUser, E = unknown>(body: IRegisterDto): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: this.URL + '/register',
      data: body
    }

    return await this.httpClient.request<T, E>(config)
  }
  async getUserFromToken<T = IUser, E = unknown>(token: string): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: this.URL + '/user',
      headers: { Authorization: `Bearer ${token}` }
    }

    return await this.httpClient.request<T, E>(config)
  }
}
