import { ReactNode } from 'react'
import { NavigationBar } from '../../navigation/components/NavigationBar'

interface IBasePrivateScreen {
  children: ReactNode
}

export const BasePrivateScreen = ({ children }: IBasePrivateScreen) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <NavigationBar />
      <main>{children}</main>
    </div>
  )
}
