import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Paths } from '@/shared/enums'
import { NavItem } from '@/shared/ui/layout'
import {
  CreditCardIconIcon,
  CreditCardOutlineIcon,
  ImageIcon,
  ImageOutlineIcon,
  PersonIcon,
  PersonOutlineIcon,
  TrendingUpIcon,
  TrendingUpOutlineIcon,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './BottomBar.module.scss'

type BottomBarProps = {
  isAuth: boolean
  userId: string
} & ComponentPropsWithoutRef<'nav'>

type BottomBarRef = ElementRef<'nav'>

export const BottomBar = forwardRef<BottomBarRef, BottomBarProps>(
  ({ className, isAuth, userId, ...rest }, ref) => {
    const router = useRouter()

    return (
      <nav className={clsx(s.bottomBar, className)} ref={ref} {...rest}>
        <NavItem
          activeIcon={<PersonIcon className={s.icon} />}
          as={Link}
          href={Paths.Users}
          inactiveIcon={<PersonOutlineIcon className={s.icon} />}
          isSelected={router.asPath === Paths.Users}
          variant={'icon'}
        />
        <NavItem
          activeIcon={<TrendingUpIcon className={s.icon} />}
          as={Link}
          href={Paths.statistics}
          inactiveIcon={<TrendingUpOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.statistics}
          variant={'icon'}
        />
        <NavItem
          activeIcon={<CreditCardIconIcon className={s.icon} />}
          as={Link}
          href={Paths.Payments}
          inactiveIcon={<CreditCardOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.Payments}
          variant={'icon'}
        />
        <NavItem
          activeIcon={<ImageIcon className={s.icon} />}
          as={Link}
          href={Paths.Posts}
          inactiveIcon={<ImageOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.Posts}
          variant={'icon'}
        />
      </nav>
    )
  }
)

BottomBar.displayName = 'BottomBar'
