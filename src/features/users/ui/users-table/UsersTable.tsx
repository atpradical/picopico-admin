import { ComponentPropsWithoutRef } from 'react'

import { UserActionsDropdown } from '@/features/users/ui'
import { PaymentHistoryItem } from '@/services/payments'
import { useTranslation } from '@/shared/hooks'
import {
  BlockIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@atpradical/picopico-ui-kit'
import { Locale } from 'date-fns'

import s from './UsersTable.module.scss'

type Props = {
  dateLocale: Locale
  paginatedData: PaymentHistoryItem[]
} & ComponentPropsWithoutRef<typeof Table>

export const UsersTable = ({ dateLocale, paginatedData, ...props }: Props) => {
  const { t } = useTranslation()
  // const { locale } = useRouter()

  return (
    <Table className={s.tableRoot} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead textAlign={'left'} />
          <TableHead textAlign={'left'}>{t.usersPage.usersTable.headers.userId}</TableHead>
          <TableHead textAlign={'left'}>{t.usersPage.usersTable.headers.userName}</TableHead>
          <TableHead textAlign={'left'}>{t.usersPage.usersTable.headers.profileLInk}</TableHead>
          <TableHead textAlign={'left'}>{t.usersPage.usersTable.headers.createdAt}</TableHead>
          <TableHead textAlign={'left'}>{''}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/*{paginatedData.map((el, index) => {*/}
        {/*  const formattedDateOfPayment = longLocalizedDate(new Date(el.dateOfPayment), dateLocale)*/}
        {/*  const formattedEndDateOfSubscription = longLocalizedDate(*/}
        {/*    new Date(el.endDateOfSubscription),*/}
        {/*    dateLocale*/}
        {/*  )*/}
        {/*  const subscriptionTextsWithTranslation = SubscriptionShortLabel[locale ?? 'en'].find(*/}
        {/*    option => option.period === el.subscriptionType*/}
        {/*  )*/}
        {/*return (*/}
        <TableRow key={`key2`}>
          <TableCell textAlign={'left'} />
          <TableCell textAlign={'left'}>{'21331QErQe21'}</TableCell>
          <TableCell textAlign={'left'}>{'Ivan Yakymenko'}</TableCell>
          <TableCell textAlign={'left'}>{'Ivan.sr.yakimenko'}</TableCell>
          <TableCell textAlign={'left'}>{'12.12.2022'}</TableCell>
          <TableCell textAlign={'right'}>
            <UserActionsDropdown
              onBanConfirm={() => {
                console.log('User banned')
              }}
              onDeleteConfirm={() => {
                console.log('User deleted')
              }}
              userId={'user-id-1'}
            />
          </TableCell>
        </TableRow>
        <TableRow key={`key1`}>
          <TableCell textAlign={'left'}>
            <BlockIcon />
          </TableCell>
          <TableCell textAlign={'left'}>{'21331QErQe21'}</TableCell>
          <TableCell textAlign={'left'}>{'Ivan Yakymenko'}</TableCell>
          <TableCell textAlign={'left'}>{'Ivan.sr.yakimenko'}</TableCell>
          <TableCell textAlign={'left'}>{'12.12.2022'}</TableCell>
          <TableCell textAlign={'right'}>
            <UserActionsDropdown
              onBanConfirm={() => {
                console.log('User banned')
              }}
              onDeleteConfirm={() => {
                console.log('User deleted')
              }}
              userId={'user-id-2'}
            />
          </TableCell>
        </TableRow>
        {/*)})}*!/*/}
      </TableBody>
    </Table>
  )
}
