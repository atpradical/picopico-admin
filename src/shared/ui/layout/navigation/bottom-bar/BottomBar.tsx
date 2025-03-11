import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Paths } from '@/shared/enums'
import { NavItem } from '@/shared/ui/layout'
import {
  HomeIcon,
  HomeOutlineIcon,
  PersonIcon,
  PersonOutlineIcon,
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
          activeIcon={<HomeIcon className={s.icon} />}
          as={Link}
          href={Paths.Home}
          inactiveIcon={<HomeOutlineIcon className={s.icon} />}
          isSelected={router.pathname === Paths.Home}
          variant={'icon'}
        />
        <NavItem
          activeIcon={<PersonIcon className={s.icon} />}
          as={Link}
          href={`${Paths.profile}/${userId}`}
          inactiveIcon={<PersonOutlineIcon className={s.icon} />}
          isSelected={router.asPath === `${Paths.profile}/${userId}`}
          variant={'icon'}
        />
      </nav>
    )
  }
)

BottomBar.displayName = 'BottomBar'
