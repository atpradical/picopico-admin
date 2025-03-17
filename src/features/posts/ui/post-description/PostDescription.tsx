import { Avatar, Typography } from '@atpradical/picopico-ui-kit'

import s from './PostDescription.module.scss'

type Props = {
  //TODO: POSTS fix any
  postData: any[]
}
export const PostDescription = ({ postData }: Props) => {
  // const { locale } = useTranslation()

  // const formattedDate = new Date(postData.updatedAt).toLocaleDateString(locale, {
  //   day: 'numeric',
  //   month: 'long',
  //   year: 'numeric',
  // })

  return (
    <div className={s.container}>
      <Avatar size={'xs'} src={''} userName={'userName'} />
      <div className={s.descriptionWrapper}>
        <Typography variant={'regular_14'}>{'userName'}</Typography>
        <Typography variant={'regular_14'}>{'description'}</Typography>
        <Typography grey variant={'small'}>
          {'formattedDate'}
        </Typography>
      </div>
    </div>
  )
}
