import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CreateNewCustomer } from '../pages/CreateNewCustomer'
import { CreateNewArchitect } from '../pages/CreateNewArchitect'
import { Signup } from '../pages/Signup'
import {
  CREATE_NEW_CUSTOMER,
  HOME,
  CREATE_NEW_ARCHITECT,
  LOGIN,
  APP,
  SERVICE_REQUESTS,
} from './CONSTANTS'
import { PublicRoute } from './PublicRoute'
import { Login } from '../pages/Login'
import { ProtectedRoute } from './ProtectedRoute'
import { CustomerHome } from '../pages/Customer/CustomerHome'
import { CustomerServiceRequests } from '../pages/Customer/CustomerServiceRequests'
import { ArchitectHome } from '../pages/Architect/ArchitectHome'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<PublicRoute />}>
        <Route path={HOME()} element={<Signup />} />
        <Route path={LOGIN()} element={<Login />} />
        <Route path={CREATE_NEW_CUSTOMER()} element={<CreateNewCustomer />} />
        <Route path={CREATE_NEW_ARCHITECT()} element={<CreateNewArchitect />} />
      </Route>

      {/* authenticated routes */}
      <Route element={<ProtectedRoute />}>
        {/* Customer */}
        <Route path={APP('customer')} element={<CustomerHome />} />
        <Route
          path={SERVICE_REQUESTS('customer')}
          element={<CustomerServiceRequests />}
        />
        {/* Architect */}
        <Route path={APP('architect')} element={<ArchitectHome />} />
      </Route>
    </Routes>
  )
}
