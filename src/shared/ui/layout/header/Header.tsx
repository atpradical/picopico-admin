import { useContext, useMemo } from 'react'

import { NotificationPopover } from '@/features/notifications/ui'
import { AppMetaDataContext, AuthContext } from '@/shared/context'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { HeaderMobileMenubar } from '@/shared/ui/layout'
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
  const { isAuth } = useContext(AuthContext)
  const { isMobile } = useContext(AppMetaDataContext)
  const { t } = useTranslation()
  const { asPath, locale, pathname, push, query } = useRouter()

  // const [cursor, setCursor] = useState(NOTIFICATION_INITIAL_CURSOR)

  // const { data } = useGetNotificationsQuery(
  //   {
  //     cursor,
  //     pageSize: NOTIFICATION_MAX_PAGE_SIZE,
  //     sortDirection: SortDirection.DESC,
  //   },
  //   { skip: true }
  // )

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
    // setCursor(cursor)
  }

  if (!isClient) {
    return null
  }

  return (
    <div className={s.wrapper}>
      <Button as={Link} className={s.logoWrapper} href={Paths.Home} tabIndex={-1} variant={'link'}>
        <LogoLight className={s.logo} />
        <div className={s.titleWrapper}>
          {!isMobile && (
            <Typography as={'h1'} variant={'large'}>
              PicoPico
            </Typography>
          )}
          <Typography as={'span'} variant={'small'}>
            Super<strong className={s.titleHighlight}>Admin</strong>
          </Typography>
        </div>
      </Button>
      <div className={s.container}>
        {isAuth && (
          <NotificationPopover
            notReadCount={10}
            notifications={[]}
            onScroll={updateCursorHandler}
            totalCount={10}
          />
        )}
        <Select
          className={s.selectLang}
          defaultValue={locale ?? 'en'}
          isSmall={isMobile}
          onValueChange={changeLangHandler}
          options={languages}
        />
        {isMobile && <HeaderMobileMenubar isAuth={isAuth} />}
      </div>
    </div>
  )
}
