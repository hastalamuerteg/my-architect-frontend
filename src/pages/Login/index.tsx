import { FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../navigation/contexts/AuthContextProvider'

interface IFrom {
  pathname: string
}

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location?.state as IFrom) || '/'

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const user = await signIn({
        email,
        password,
      })
      navigate(
        from?.pathname ?? `/app/${user?.isCustomer ? 'customer' : 'architect'}`,
        { replace: true },
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-start bg-orange-300 bg-opacity-30 py-20 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-orange-500">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          <div className="rounded-lg shadow-sm -space-y-px">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full my-4 px-3 py-3 border-2 rounded-lg border-orange-500 placeholder-orange-700 focus:outline-none focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full my-4 px-3 py-3 border-2 rounded-lg border-orange-500 placeholder-orange-700 focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 text-sm font-bold rounded-lg text-white bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
