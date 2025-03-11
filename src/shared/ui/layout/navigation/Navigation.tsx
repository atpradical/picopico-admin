import { useContext } from 'react'

import { AppMetaDataContext, AuthContext } from '@/shared/contexts'
import { useLogout, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { SideBar } from '@/shared/ui/layout'

import { BottomBar } from './bottom-bar'

type Props = {}
export const Navigation = ({}: Props) => {
  const { t } = useTranslation()

  const { isAuth, meData } = useContext(AuthContext)
  const { isMobile } = useContext(AppMetaDataContext)

  const { isLoading, isLogoutDialog, logoutHandler, setLogoutDialog } = useLogout()

  if (!isAuth) {
    return null
  }

  return (
    <>
      {isMobile ? (
        <BottomBar isAuth={isAuth} userId={String(meData?.userId)} />
      ) : (
        <SideBar
          isAuth={isAuth}
          onOpenLogoutDialog={setLogoutDialog}
          userId={String(meData?.userId)}
        />
      )}
      {isLogoutDialog && (
        <ConfirmDialog
          isLoading={isLoading}
          isOpen={isLogoutDialog}
          onConfirm={logoutHandler}
          onOpenChange={setLogoutDialog}
          t={{
            ...t.logoutDialog,
            visibleBody: `${t.logoutDialog.visibleBody}: ${meData?.email || ''}?`,
          }}
        />
      )}
    </>
  )
}
