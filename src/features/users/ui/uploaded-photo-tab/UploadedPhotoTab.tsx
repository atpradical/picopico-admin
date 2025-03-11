import { ComponentPropsWithoutRef } from 'react'

import { TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'

import s from './UploadedPhotoTab.module.scss'

type UploadedPhotosTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const UploadedPhotosTab = ({ className, ...rest }: UploadedPhotosTabProps) => {
  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Uploaded Photos Data
      </Typography>
    </TabsContent>
  )
}
