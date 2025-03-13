import { ComponentPropsWithoutRef, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { useTranslation } from '@/shared/hooks'
import { Colors, ComparisonChart, TabsContent, mockdata } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './PostsStatTab.module.scss'

type Props = ComponentPropsWithoutRef<typeof TabsContent>
export const PostsStatTab = ({ className, ...rest }: Props) => {
  const { t } = useTranslation()
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <ComparisonChart
        chartTitle={t.statisticsPage.charts.titles.posts}
        data={mockdata}
        datePickerPlaceholder={t.datePickerPlaceholder}
        onDateSelect={setDate}
        primaryLegendText={t.statisticsPage.charts.legends.primary}
        primaryLineColor={Colors.Success100}
        secondaryLegendText={t.statisticsPage.charts.legends.secondary}
        secondaryLineColor={Colors.Success900}
        selectedDate={date}
      />
    </TabsContent>
  )
}
