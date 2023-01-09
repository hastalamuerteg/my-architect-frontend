import { createContext, ReactNode, useContext } from 'react'
import { useProvideAuth } from './useProvideAuth'
import { ISignInCredentials, IUserAuthResponse } from '../../types/auth'

interface IAuthContextProvider {
  authUser: IUserAuthResponse | null
  signIn: (
    credentials: ISignInCredentials,
  ) => Promise<IUserAuthResponse | undefined>
  signOut: () => void
}

interface IAuthContextProviderProps {
  children: ReactNode
}

const AuthContext = createContext<IAuthContextProvider>(
  {} as IAuthContextProvider,
)

export const AuthContextProvider = ({
  children,
}: IAuthContextProviderProps) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth(): IAuthContextProvider {
  return useContext(AuthContext)
}
