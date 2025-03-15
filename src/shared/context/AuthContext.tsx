import { ReactNode, createContext, useEffect, useState } from 'react'

import { Paths } from '@/shared/enums'
import { useRouter } from 'next/router'
import { useIsClient } from 'usehooks-ts'

type AuthContextType = {
  isAuth: boolean
  setAuth?: (isAuth: boolean) => void
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
})

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { push } = useRouter()
  const isClient = useIsClient()
  const [isAuth, setAuth] = useState(false)

  useEffect(() => {
    if (isClient) {
      const token = localStorage.getItem('token')

      if (token) {
        setAuth(true)
      } else {
        void push(Paths.logIn)
      }
    }
    // eslint-disable-next-line
  }, [isClient])

  return <AuthContext.Provider value={{ isAuth, setAuth }}>{children}</AuthContext.Provider>
}
