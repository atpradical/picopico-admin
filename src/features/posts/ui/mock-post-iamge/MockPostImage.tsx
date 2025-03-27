import { ImageOutlineIcon, Typography } from '@atpradical/picopico-ui-kit'

import s from './MockPostImage.module.scss'

export const MockPostImage = () => {
  return (
    <div className={s.noImage}>
      <ImageOutlineIcon />
      <Typography grey variant={'small'}>
        not exist
      </Typography>
    </div>
  )
}
