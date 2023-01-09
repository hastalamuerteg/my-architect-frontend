import { ReactNode } from 'react'
import { Header } from '../../navigation/components/Header'

interface IBasePublicScreen {
  children: ReactNode
}

export const BasePublicScreen = ({ children }: IBasePublicScreen) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <main>{children}</main>
    </div>
  )
}
