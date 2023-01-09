import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo.jpg'

export const Header = () => {
  const navigate = useNavigate()
  return (
    <header className="flex items-center justify-center h-28 w-full px-4">
      <picture onClick={() => navigate('/')} className="cursor-pointer">
        <img src={logo} alt="" className="w-48 h-48 rounded-full" />
      </picture>
    </header>
  )
}
