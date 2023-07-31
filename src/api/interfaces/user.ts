import { IBase } from './base'

export interface IUser extends IBase {
  email: string
  username: string
  recentSearches: string[]
}

export type IUserCreateDto = Partial<IUser>
export type IUserUpdateDto = Partial<IUser>
