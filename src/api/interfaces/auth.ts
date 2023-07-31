export interface ILogin {
  username: string
  password: string
}

export interface ILoginResponse {
  token: string
}

export interface IRegisterDto {
  email: string
  username: string
  password: string
}
