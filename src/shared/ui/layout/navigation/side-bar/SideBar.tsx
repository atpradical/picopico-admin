import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { NavItem } from '@/shared/ui/layout'
import {
  CreditCardIconIcon,
  CreditCardOutlineIcon,
  ImageIcon,
  ImageOutlineIcon,
  LogOutOutlineIcon,
  PersonIcon,
  PersonOutlineIcon,
  TrendingUpIcon,
  TrendingUpOutlineIcon,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

type SideBarProps = {
  isAuth: boolean
  onOpenLogoutDialog: (open: boolean) => void
  userId: string
} & ComponentPropsWithoutRef<'nav'>

type SideBarRef = ElementRef<'nav'>

export const SideBar = forwardRef<SideBarRef, SideBarProps>(
  ({ className, isAuth, onOpenLogoutDialog, userId, ...rest }, ref) => {
    const router = useRouter()
    const { t } = useTranslation()

    return (
      <nav className={clsx(s.sidebar, className)} ref={ref} {...rest}>
        <div className={s.group}>
          <NavItem
            activeIcon={<PersonIcon className={s.icon} />}
            as={Link}
            fullWidth
            href={Paths.Users}
            inactiveIcon={<PersonOutlineIcon className={s.icon} />}
            isSelected={router.asPath === Paths.Users}
            label={t.appSidebar.userList}
            variant={'icon'}
          />
          <NavItem
            activeIcon={<TrendingUpIcon className={s.icon} />}
            as={Link}
            fullWidth
            href={Paths.statistics}
            inactiveIcon={<TrendingUpOutlineIcon className={s.icon} />}
            isSelected={router.pathname === Paths.statistics}
            label={t.appSidebar.statisticsLink}
            variant={'icon'}
          />
          <NavItem
            activeIcon={<CreditCardIconIcon className={s.icon} />}
            as={Link}
            fullWidth
            href={Paths.Payments}
            inactiveIcon={<CreditCardOutlineIcon className={s.icon} />}
            isSelected={router.pathname === Paths.Payments}
            label={t.appSidebar.paymentsList}
            variant={'icon'}
          />
          <NavItem
            activeIcon={<ImageIcon className={s.icon} />}
            as={Link}
            fullWidth
            href={Paths.Posts}
            inactiveIcon={<ImageOutlineIcon className={s.icon} />}
            isSelected={router.pathname === Paths.Posts}
            label={t.appSidebar.postsList}
            variant={'icon'}
          />
        </div>
        <div className={s.group}>
          <NavItem
            fullWidth
            inactiveIcon={<LogOutOutlineIcon className={s.icon} />}
            label={t.appSidebar.logOutButton}
            onClick={() => onOpenLogoutDialog(true)}
            variant={'icon'}
          />
        </div>
      </nav>
    )
  }
)

SideBar.displayName = 'SideBar'
