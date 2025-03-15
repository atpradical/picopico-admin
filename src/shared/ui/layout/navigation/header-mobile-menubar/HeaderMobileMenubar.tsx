import { useLogout, useTranslation } from '@/shared/hooks'
import { ConfirmDialog } from '@/shared/ui/components'
import { NavItem } from '@/shared/ui/layout'
import {
  Button,
  LogOutOutlineIcon,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MoreHorizontalIcon,
} from '@atpradical/picopico-ui-kit'

import s from './HeaderMobileMenubar.module.scss'

type Props = {
  isAuth: boolean
}

export const HeaderMobileMenubar = ({ isAuth }: Props) => {
  const { t } = useTranslation()
  const { isLogoutDialog, logoutHandler, setLogoutDialog } = useLogout()

  if (!isAuth) {
    return null
  }

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button variant={'icon'}>
              <MoreHorizontalIcon className={s.icon} />
            </Button>
          </MenubarTrigger>
          <MenubarContent align={'end'} className={s.menubarContent} side={'bottom'} sideOffset={5}>
            <MenubarItem className={s.menuItem}>
              <NavItem
                className={s.fullWidth}
                inactiveIcon={<LogOutOutlineIcon className={s.icon} />}
                label={t.appSidebar.logOutButton}
                onClick={() => setLogoutDialog(true)}
                variant={'icon'}
              />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {/*todo: вынести в app ConfirmationDialog*/}
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
