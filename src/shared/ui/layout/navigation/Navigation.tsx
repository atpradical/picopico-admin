import { useContext } from 'react'

import { AppMetaDataContext, AuthContext } from '@/shared/context'
import { useLogout, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { BottomBar, SideBar } from '@/shared/ui/layout'

type Props = {}
export const Navigation = ({}: Props) => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { isMobile } = useContext(AppMetaDataContext)
  const { isLogoutDialog, logoutHandler, setLogoutDialog } = useLogout()

  if (!isAuth) {
    return null
  }

  return (
    <>
      {isMobile ? (
        <BottomBar isAuth userId={'1234'} />
      ) : (
        <SideBar isAuth onOpenLogoutDialog={setLogoutDialog} userId={'1234'} />
      )}
      {isLogoutDialog && (
        <ConfirmDialog
          isOpen={isLogoutDialog}
          onConfirm={logoutHandler}
          onOpenChange={setLogoutDialog}
          t={{
            ...t.logoutDialog,
            visibleBody: `${t.logoutDialog.visibleBody}?`,
          }}
        />
      )}
    </>
  )
}
