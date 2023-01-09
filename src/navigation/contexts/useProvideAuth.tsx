import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IUserAuthRequest, IUserAuthResponse } from '../../types/auth'
import { userAuth } from '../../services/base'

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState<IUserAuthResponse | null>(null)

  const navigate = useNavigate()

  const cleanSession = () => {
    setAuthUser(null)
  }

  const signIn = async ({ email, password }: IUserAuthRequest) => {
    try {
      const response = await userAuth({ email, password })
      if (response.data) {
        setAuthUser(response.data)
        return response.data
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const signOut = async () => {
    cleanSession()
    navigate('/')
  }

  return {
    authUser,
    signIn,
    signOut,
  }
}
