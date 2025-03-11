import { Page, getNavigationLayout } from '@/shared/ui/layout'

import s from './PostsPage.module.scss'

function PostsPage() {
  return (
    <Page pt={'36px'}>
      <div className={s.test}>Posts Data</div>
    </Page>
  )
}

PostsPage.getLayout = getNavigationLayout
export default PostsPage
