import { AxiosError, AxiosResponse } from 'axios'

export interface RequestWrapper<T, E> {
  err: AxiosError<E> | null
  res: AxiosResponse<T> | undefined
}

export interface IResponse {
  message: string
}

export interface IBase {
  _id?: string
  createdDate?: number
  updatedDate?: number
}
//TODO: update later for different types of endpoints
export interface QueryParams {
  skip?: number
  limit?: number
  filter?: string | object
  sortBy?: string
  text?: string
  startDate?: number
  endDate?: number
}

export interface PaginatedResult<T> {
  metaData?: { totalCount: number }
  items?: T[]
}
