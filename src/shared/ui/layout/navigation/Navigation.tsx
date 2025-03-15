import { useLogout, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { BottomBar, SideBar } from '@/shared/ui/layout'

type Props = {}
export const Navigation = ({}: Props) => {
  const { t } = useTranslation()

  const { isLogoutDialog, logoutHandler, setLogoutDialog } = useLogout()

  return (
    <>
      <SideBar isAuth onOpenLogoutDialog={setLogoutDialog} userId={'1234'} />
      <BottomBar isAuth userId={'1234'} />
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
