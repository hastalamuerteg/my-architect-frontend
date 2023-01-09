import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContextProvider'
import { BasePrivateScreen } from '../pages/BasePrivateScreen'

export const ProtectedRoute = () => {
  const { authUser } = useAuth()
  const location = useLocation()

  return authUser ? (
    <BasePrivateScreen>
      <Outlet />
    </BasePrivateScreen>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
