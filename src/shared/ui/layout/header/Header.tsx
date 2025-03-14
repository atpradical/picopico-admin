import { useMemo, useState } from 'react'

import {
  NOTIFICATION_INITIAL_CURSOR,
  NOTIFICATION_MAX_PAGE_SIZE,
} from '@/features/notifications/config'
import { NotificationPopover } from '@/features/notifications/ui'
import { useGetNotificationsQuery } from '@/services/notifications'
import { Paths, SortDirection } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import {
  Button,
  FlagRussiaIcon,
  FlagUnitedKingdomIcon,
  LogoLight,
  OptionsValue,
  Select,
  Typography,
} from '@atpradical/picopico-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useIsClient } from 'usehooks-ts'

import s from './Header.module.scss'

export type HeaderProps = {}

export const Header = ({}: HeaderProps) => {
  const isClient = useIsClient()
  const { t } = useTranslation()
  const { asPath, locale, pathname, push, query } = useRouter()

  const [cursor, setCursor] = useState(NOTIFICATION_INITIAL_CURSOR)

  const { data } = useGetNotificationsQuery(
    {
      cursor,
      pageSize: NOTIFICATION_MAX_PAGE_SIZE,
      sortDirection: SortDirection.DESC,
    },
    { skip: true }
  )

  const languages: OptionsValue[] = useMemo(
    () => [
      {
        icon: <FlagRussiaIcon className={s.icon} />,
        label: t.language.ru,
        value: 'ru',
      },
      {
        icon: <FlagUnitedKingdomIcon className={s.icon} />,
        label: t.language.en,
        value: 'en',
      },
    ],
    [t.language]
  )

  const changeLangHandler = (lang: string) => {
    push({ pathname, query }, asPath, { locale: lang })
  }

  const updateCursorHandler = (cursor: number) => {
    setCursor(cursor)
  }

  if (!isClient) {
    return null
  }

  return (
    <div className={s.wrapper}>
      <Button as={Link} className={s.logoWrapper} href={Paths.Home} tabIndex={-1} variant={'link'}>
        <LogoLight className={s.logo} />
        <div className={s.titleWrapper}>
          <Typography as={'h1'} variant={'large'}>
            PicoPico
          </Typography>
          <Typography as={'span'} variant={'small'}>
            Super<strong className={s.titleHighlight}>Admin</strong>
          </Typography>
        </div>
      </Button>
      <div className={s.container}>
        <NotificationPopover
          notReadCount={data?.notReadCount}
          notifications={data?.items}
          onScroll={updateCursorHandler}
          totalCount={data?.totalCount}
        />
        <Select
          className={s.selectLang}
          defaultValue={locale ?? 'en'}
          // isSmall={isMobile}
          onValueChange={changeLangHandler}
          options={languages}
        />
        <Button as={Link} className={s.button} href={Paths.logIn} variant={'nb-outlined'}>
          {t.appHeader.signInButton}
        </Button>
        {/*{isMobile && <HeaderMobileMenubar isAuth={isAuth} />}*/}
      </div>
    </div>
  )
}
