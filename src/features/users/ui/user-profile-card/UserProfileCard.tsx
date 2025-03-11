import { Avatar, Card, Typography } from '@atpradical/picopico-ui-kit'

import s from './UserProfileCard.module.scss'

type Props = {}
export const UserProfileCard = (props: Props) => {
  return (
    <Card className={s.profileContainer} variant={'transparent'}>
      <div className={s.flexRowContainer}>
        <Avatar size={'m'} src={''} userName={'User Name'} />
        <div>
          <Typography variant={'h1'}>Ivan Yakimenko</Typography>
          <Typography>Ivan Yakimenko</Typography>
        </div>
      </div>
      <div className={s.flexRowContainer}>
        <div>
          <Typography grey>UserID</Typography>
          <Typography variant={'regular_16'}>21331QErQe21</Typography>
        </div>
        <div>
          <Typography grey>Profile Creation Date</Typography>
          <Typography variant={'regular_16'}>12.12.2022</Typography>
        </div>
      </div>
    </Card>
  )
}
