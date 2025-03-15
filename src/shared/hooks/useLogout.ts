import { useState } from 'react'

import { Paths } from '@/shared/enums'
import { useRouter } from 'next/router'

export const useLogout = () => {
  const { push } = useRouter()
  const [isLogoutDialog, setLogoutDialog] = useState(false)

  const logoutHandler = async () => {
    setLogoutDialog(false)
    localStorage.removeItem('token')
    void push(Paths.logIn)
  }

  return {
    isLogoutDialog,
    logoutHandler,
    setLogoutDialog,
  }
}
