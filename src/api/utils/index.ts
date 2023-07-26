import { AxiosError } from 'axios'

export function to<T, U = AxiosError>(promise: Promise<T>): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      return [err, undefined]
    })
}
