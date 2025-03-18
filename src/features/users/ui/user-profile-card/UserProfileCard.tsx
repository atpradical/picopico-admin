import { useContext } from 'react'

import { QueryGetUserArgs } from '@/services/schema.types'
import { useGetUserQuery } from '@/services/users'
import { AuthContext } from '@/shared/context'
import { useTranslation } from '@/shared/hooks'
import { longLocalizedDate } from '@/shared/utils/dates'
import { Avatar, Card, Spinner, Typography } from '@atpradical/picopico-ui-kit'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './UserProfileCard.module.scss'

export const UserProfileCard = () => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { locale, query } = useRouter()

  const userId = query.id ? query.id : ''
  const dateLocale = locale === 'ru' ? ru : enUS

  const { data, loading } = useGetUserQuery({
    // TODO: GRAPHQL обработка ошибок
    fetchPolicy: 'network-only',
    skip: !isAuth || !userId,
    variables: {
      userId: +userId as QueryGetUserArgs['userId'],
    },
  })

  const userFullName = data?.getUser.profile?.firstName
    ? data?.getUser.profile?.firstName + ' ' + data?.getUser.profile?.lastName
    : t.userDetailsPage.profileCard.anonymous

  const formattedCreatedAt = longLocalizedDate(
    new Date(data?.getUser.createdAt ?? null),
    dateLocale
  )

  return (
    <Card className={s.profileContainer} variant={'transparent'}>
      {loading && <Spinner label={t.loading} />}
      <div className={s.flexRowContainer}>
        <Avatar
          showFallback
          size={'m'}
          src={data?.getUser.profile.avatars?.[1]?.url ?? ''}
          userName={data?.getUser.userName}
        />
        <div>
          <Typography variant={'h1'}>{userFullName}</Typography>
          <Typography>{data?.getUser.userName}</Typography>
        </div>
      </div>
      <div className={s.flexRowContainer}>
        <div>
          <Typography grey>{t.userDetailsPage.profileCard.userId}</Typography>
          <Typography variant={'regular_16'}>{data?.getUser.id}</Typography>
        </div>
        <div>
          <Typography grey>{t.userDetailsPage.profileCard.createdAt}</Typography>
          <Typography variant={'regular_16'}>{formattedCreatedAt}</Typography>
        </div>
      </div>
    </Card>
  )
}
