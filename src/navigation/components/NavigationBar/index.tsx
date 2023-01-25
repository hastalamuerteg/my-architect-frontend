import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.jpg'
import { SignOut } from 'phosphor-react'
import { APP, SERVICE_REQUESTS } from '../../CONSTANTS'
import { useAuth } from '../../contexts/AuthContextProvider'

export const NavigationBar = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const handleGoToServiceRequests = () => {
    auth?.authUser?.isCustomer
      ? navigate(SERVICE_REQUESTS('customer'))
      : navigate(APP('architect'))
  }
  const handleGoToArchitectsList = () => {
    navigate(APP('customer'))
  }

  return (
    <header className="flex items-center justify-between h-28 w-full px-4 py-2 bg-orange-300 bg-opacity-50 shadow-md">
      <picture>
        <img src={logo} alt="" className="w-20 h-20 rounded-full" />
      </picture>
      <ul className="flex mr-10 space-x-4">
        {auth?.authUser?.isCustomer && (
          <li
            className="px-3 py-2 font-semibold text-md bg-orange-500 text-white rounded-xl cursor-pointer"
            onClick={handleGoToArchitectsList}
          >
            architects
          </li>
        )}
        <li
          className="px-3 py-2 font-semibold text-md bg-orange-500 text-white rounded-xl cursor-pointer"
          onClick={handleGoToServiceRequests}
        >
          service requests
        </li>
        <li
          className="px-3 py-2 font-semibold text-md bg-orange-500 text-white rounded-xl cursor-pointer flex items-center"
          onClick={() => auth.signOut()}
        >
          logout
          <SignOut className="ml-4" />
        </li>
      </ul>
    </header>
  )
}
