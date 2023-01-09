export interface IUserAuthResponse {
  id: string
  firstName: string
  lastName: string
  gender: string
  phone: string
  email: string
  isCustomer?: boolean
  isArchitect?: boolean
}

export interface IUserAuthRequest {
  email: string
  password: string
}

export interface ISignInCredentials {
  email: string
  password: string
}
