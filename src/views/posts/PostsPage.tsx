import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Typography } from '@atpradical/picopico-ui-kit'

import s from './PostsPage.module.scss'

function PostsPage() {
  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <Typography grey variant={'large'}>
          Posts Data
        </Typography>
        <Typography variant={'error'}>Page in development...</Typography>
      </div>
    </Page>
  )
}

PostsPage.getLayout = getNavigationLayout
export default PostsPage
