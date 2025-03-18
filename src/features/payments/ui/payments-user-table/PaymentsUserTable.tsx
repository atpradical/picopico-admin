import { ComponentPropsWithoutRef } from 'react'

import { PaymentSystemDisplay, SubscriptionShortLabel } from '@/features/payments/config'
import { GetPaymentsByUserQuery } from '@/services/payments'
import { BillingPeriod } from '@/shared/enums'
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

import s from './PaymentsUserTable.module.scss'

type Props = {
  dateLocale: Locale
  items: GetPaymentsByUserQuery['getPaymentsByUser']['items'][number][] | undefined
} & ComponentPropsWithoutRef<typeof Table>

export const PaymentsUserTable = ({ dateLocale, items, ...props }: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Table className={s.tableRoot} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead textAlign={'left'}>{t.paymentsTab.table.header.dateOfPayment}</TableHead>
          <TableHead textAlign={'left'}>{t.paymentsTab.table.header.subscriptionEndDate}</TableHead>
          <TableHead textAlign={'right'}>{t.paymentsTab.table.header.price}</TableHead>
          <TableHead textAlign={'left'}>
            {t.paymentsTab.table.header.subscriptionDescription}
          </TableHead>
          <TableHead textAlign={'left'}>{t.paymentsTab.table.header.paymentSystem}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map(el => {
          const formattedDateOfPayment = longLocalizedDate(new Date(el.dateOfPayment), dateLocale)
          const formattedEndDate = longLocalizedDate(new Date(el.endDate), dateLocale)

          const subscriptionTextsWithTranslation = SubscriptionShortLabel[locale ?? 'en'].find(
            option => option.period === (el.type as unknown as BillingPeriod)
          )

          return (
            <TableRow key={el.id}>
              <TableCell textAlign={'left'}>{formattedDateOfPayment}</TableCell>
              <TableCell textAlign={'left'}>{formattedEndDate}</TableCell>
              <TableCell textAlign={'right'}>{el.price}</TableCell>
              <TableCell textAlign={'left'}>{subscriptionTextsWithTranslation?.label}</TableCell>
              <TableCell textAlign={'left'}>{PaymentSystemDisplay[el.paymentType ?? '']}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
