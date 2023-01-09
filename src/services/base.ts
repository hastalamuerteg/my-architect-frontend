import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  IArchitect,
  ICreateNewArchitect,
  ICreateNewCostumer,
  ICreateServiceRequest,
  IEditServiceRequest,
  IProfile,
  IServiceRequest,
} from '../types'
import { IUserAuthRequest, IUserAuthResponse } from '../types/auth'

export const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
})

interface IMessageErrors {
  error?: string
  statusCode: number
  id?: string
  message: string
}

interface IApiResponse<T> {
  success: boolean
  data: T
  error?: IMessageErrors[]
}

export const request = async <T>(
  options: AxiosRequestConfig,
): Promise<IApiResponse<T>> => {
  const onSuccess = (response: AxiosResponse<T>) => ({
    success: true,
    data: response.data,
  })

  const onError = (error: any) => ({
    success: false,
    data: error.data,
    errors: [error.response.data],
  })

  return client(options).then(onSuccess).catch(onError)
}

// auth

export const userAuth = async (
  data: IUserAuthRequest,
): Promise<IApiResponse<IUserAuthResponse>> =>
  request({
    baseURL: `${import.meta.env.VITE_BACKEND_URL as string}/auth`,
    method: 'POST',
    data,
  })

// customers
export const createNewCostumer = async (
  data: ICreateNewCostumer,
): Promise<IApiResponse<ICreateNewCostumer>> =>
  request({
    baseURL: `${import.meta.env.VITE_BACKEND_URL as string}/customers`,
    method: 'POST',
    data,
  })

// architects
export const createNewArchitect = async (
  data: ICreateNewArchitect,
): Promise<IApiResponse<ICreateNewArchitect>> =>
  request({
    baseURL: `${import.meta.env.VITE_BACKEND_URL as string}/architects`,
    method: 'POST',
    data,
  })

export const getArchitects = async (
  userId: string,
): Promise<IApiResponse<IArchitect[]>> =>
  request({
    baseURL: `${
      import.meta.env.VITE_BACKEND_URL as string
    }/architects/${userId}`,
  })

// service request
export const getServiceRequests = async (
  profile: IProfile,
  profileId: string,
): Promise<IApiResponse<IServiceRequest[]>> =>
  request({
    baseURL: `${import.meta.env.VITE_BACKEND_URL as string}/service-requests/${
      profile === 'architect'
        ? `?architectId=${profileId}`
        : `?customerId=${profileId}`
    }`,
  })

export const createNewServiceRequest = async (
  data: ICreateServiceRequest,
): Promise<IApiResponse<void>> =>
  request({
    baseURL: `${import.meta.env.VITE_BACKEND_URL as string}/service-requests`,
    method: 'POST',
    data,
  })

export const editServiceRequest = async (
  serviceRequestId: string,
  data: IEditServiceRequest,
): Promise<IApiResponse<void>> =>
  request({
    baseURL: `${
      import.meta.env.VITE_BACKEND_URL as string
    }/service-requests/${serviceRequestId}`,
    method: 'POST',
    data,
  })

export const deleteServiceRequest = async (
  serviceRequestId: string,
): Promise<IApiResponse<void>> =>
  request({
    baseURL: `${
      import.meta.env.VITE_BACKEND_URL as string
    }/service-requests/${serviceRequestId}`,
    method: 'PATCH',
  })

export const acceptServiceRequest = async (
  serviceRequestId: string,
  architectId: string,
): Promise<IApiResponse<void>> =>
  request({
    baseURL: `${
      import.meta.env.VITE_BACKEND_URL as string
    }/service-requests/accept/${serviceRequestId}/architect/${architectId}`,
    method: 'PATCH',
  })

export const refuseServiceRequest = async (
  serviceRequestId: string,
  architectId: string,
): Promise<IApiResponse<void>> =>
  request({
    baseURL: `${
      import.meta.env.VITE_BACKEND_URL as string
    }/service-requests/refuse/${serviceRequestId}/architect/${architectId}`,
    method: 'PATCH',
  })
