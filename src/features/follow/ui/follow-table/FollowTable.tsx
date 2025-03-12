import { ComponentPropsWithoutRef } from 'react'

import { SubscriptionShortLabel } from '@/features/payments/config'
import { useTranslation } from '@/shared/hooks'
import { longLocalizedDate } from '@/shared/utils/dates'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@atpradical/picopico-ui-kit'
import { Locale } from 'date-fns'
import { useRouter } from 'next/router'

import s from './FollowTable.module.scss'

type Props = {
  dateLocale: Locale
  // TODO: PAYMENTS fix any
  paginatedData: any[]
} & ComponentPropsWithoutRef<typeof Table>

export const FollowTable = ({ dateLocale, paginatedData, ...props }: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Table className={s.tableRoot} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead textAlign={'left'}>{t.follow.tabNames.userId}</TableHead>
          <TableHead textAlign={'left'}>{t.follow.tabNames.username}</TableHead>
          <TableHead textAlign={'right'}>{t.follow.tabNames.link}</TableHead>
          <TableHead textAlign={'left'}>{t.follow.tabNames.subscribeDate}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedData.map((el, index) => {
          const formattedDateOfPayment = longLocalizedDate(new Date(el.dateOfPayment), dateLocale)
          const formattedEndDateOfSubscription = longLocalizedDate(
            new Date(el.endDateOfSubscription),
            dateLocale
          )

          const subscriptionTextsWithTranslation = SubscriptionShortLabel[locale ?? 'en'].find(
            option => option.period === el.subscriptionType
          )

          //TODO: FOLLOW исправить map данных в позициях таблицы
          return (
            <TableRow key={`${el.subscriptionId}_${index}`}>
              <TableCell textAlign={'left'}>{formattedDateOfPayment}</TableCell>
              <TableCell textAlign={'left'}>{formattedEndDateOfSubscription}</TableCell>
              <TableCell textAlign={'right'}>{`$${el.price}`}</TableCell>
              <TableCell textAlign={'left'}>{subscriptionTextsWithTranslation?.label}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
