import { ComponentPropsWithoutRef } from 'react'

import { useTranslation } from '@/shared/hooks'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@atpradical/picopico-ui-kit'
import { Locale } from 'date-fns'

import s from './PaymentsUserTable.module.scss'

type Props = {
  dateLocale: Locale
  // TODO: PAYMENTS fix any
  paginatedData: any[]
} & ComponentPropsWithoutRef<typeof Table>

export const PaymentsUserTable = ({ dateLocale, paginatedData, ...props }: Props) => {
  const { t } = useTranslation()
  // const { locale } = useRouter()

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
        {paginatedData.map((el, index) => {
          // const formattedDateOfPayment = longLocalizedDate(new Date(el.dateOfPayment), dateLocale)
          // const formattedEndDateOfSubscription = longLocalizedDate(
          //   new Date(el.endDateOfSubscription),
          //   dateLocale
          // )
          //
          // const subscriptionTextsWithTranslation = SubscriptionShortLabel[locale ?? 'en'].find(
          //   option => option.period === el.subscriptionType
          // )
          return (
            <TableRow key={`${el.subscriptionId}_${index}`}>
              <TableCell textAlign={'left'}>{'formattedDateOfPayment'}</TableCell>
              <TableCell textAlign={'left'}>{'formattedEndDateOfSubscription'}</TableCell>
              <TableCell textAlign={'right'}>{'$${el.price}'}</TableCell>
              <TableCell textAlign={'left'}>{'subscriptionTextsWithTranslation?.label'}</TableCell>
              <TableCell textAlign={'left'}>{'PaymentSystemDisplay[el.paymentType]'}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
