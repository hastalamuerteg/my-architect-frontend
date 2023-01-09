import { Outlet } from 'react-router-dom'
import { BasePublicScreen } from '../pages/BasePublicScreen'

export const PublicRoute = () => {
  return (
    <BasePublicScreen>
      <Outlet />
    </BasePublicScreen>
  )
}
