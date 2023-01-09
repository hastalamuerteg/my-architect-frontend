export const HOME = () => '/'
export const APP = (profile: 'customer' | 'architect') => `app/${profile}`
export const SERVICE_REQUESTS = (profile: 'customer' | 'architect') =>
  `service-requests/${profile}`
export const LOGIN = () => '/login'
export const CREATE_NEW_CUSTOMER = () => '/create-new-customer'
export const CREATE_NEW_ARCHITECT = () => '/create-new-architect'
export const NOT_FOUND = () => '*'
