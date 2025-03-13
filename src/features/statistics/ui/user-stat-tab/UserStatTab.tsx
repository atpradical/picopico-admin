import { ComponentPropsWithoutRef, useState } from 'react'
import { DateRange } from 'react-day-picker'

// import { Colors, ComparisonChart } from '@/shared/ui/components/comparison-chart'
import { Colors, ComparisonChart, TabsContent, mockdata } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './UserStatTab.module.scss'

type Props = ComponentPropsWithoutRef<typeof TabsContent>
export const UserStatTab = ({ className, ...rest }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <ComparisonChart
        chartTitle={'New Users'}
        data={mockdata}
        datePickerPlaceholder={'Select date'}
        onDateSelect={setDate}
        primaryLegendText={'Current month'}
        primaryLineColor={Colors.Accent100}
        secondaryLegendText={'Last month'}
        secondaryLineColor={Colors.Accent900}
        selectedDate={date}
      />
      <ComparisonChart
        chartTitle={'Paid Account'}
        data={mockdata}
        datePickerPlaceholder={'Select date'}
        onDateSelect={setDate}
        primaryLegendText={'Current month'}
        primaryLineColor={Colors.Warning100}
        secondaryLegendText={'Last month'}
        secondaryLineColor={Colors.Warning900}
        selectedDate={date}
      />
    </TabsContent>
  )
}
