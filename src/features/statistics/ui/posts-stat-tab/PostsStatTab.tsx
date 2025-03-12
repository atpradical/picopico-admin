import { ComponentPropsWithoutRef } from 'react'

import { TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './PostsStatTab.module.scss'

type Props = ComponentPropsWithoutRef<typeof TabsContent>
export const PostsStatTab = ({ className, ...rest }: Props) => {
  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Photos Tab Data
      </Typography>
      <section>
        <Typography>Photos Graphics details</Typography>
      </section>
    </TabsContent>
  )
}
