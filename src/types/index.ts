export interface ICreateNewCostumer {
  firstName: string
  lastName: string
  age: string
  gender: string
  phone: string
  email: string
  password: string
}

export interface ICreateNewArchitect {
  firstName: string
  lastName: string
  age: string
  gender: string
  phone: string
  email: string
  password: string
}

export interface IArchitect {
  id: string
  firstName: string
  lastName: string
  age: string
  gender: string
  phone: string
  email: string
  password: string
}

export interface ICreateServiceRequest {
  title: string
  description: string
  customerId: string
  architectId: string
}

export interface IEditServiceRequest {
  title: string
  description: string
  customerId: string
}

export interface IServiceRequest {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  requested: boolean
  accepted: boolean
  refused: boolean
}

export type IProfile = 'customer' | 'architect'
