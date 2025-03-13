import { ComponentPropsWithoutRef, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { useTranslation } from '@/shared/hooks'
import { Colors, ComparisonChart, TabsContent, mockdata } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './UserStatTab.module.scss'

type Props = ComponentPropsWithoutRef<typeof TabsContent>
export const UserStatTab = ({ className, ...rest }: Props) => {
  const { t } = useTranslation()
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <ComparisonChart
        chartTitle={t.statisticsPage.charts.titles.users}
        data={mockdata}
        datePickerPlaceholder={t.datePickerPlaceholder}
        onDateSelect={setDate}
        primaryLegendText={t.statisticsPage.charts.legends.primary}
        primaryLineColor={Colors.Accent100}
        secondaryLegendText={t.statisticsPage.charts.legends.secondary}
        secondaryLineColor={Colors.Accent900}
        selectedDate={date}
      />
      <ComparisonChart
        chartTitle={t.statisticsPage.charts.titles.payments}
        data={mockdata}
        datePickerPlaceholder={t.datePickerPlaceholder}
        onDateSelect={setDate}
        primaryLegendText={t.statisticsPage.charts.legends.primary}
        primaryLineColor={Colors.Warning100}
        secondaryLegendText={t.statisticsPage.charts.legends.secondary}
        secondaryLineColor={Colors.Warning900}
        selectedDate={date}
      />
    </TabsContent>
  )
}
