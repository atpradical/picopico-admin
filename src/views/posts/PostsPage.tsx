import { useContext, useEffect, useRef, useState } from 'react'

import { Post } from '@/features/posts/ui'
import { INITIAL_CURSOR } from '@/features/users/config'
import { useGetAllPostsQuery } from '@/services/posts'
import { InputMaybe, QueryGetPostsArgs, QueryGetUsersArgs } from '@/services/schema.types'
import { AuthContext } from '@/shared/context'
import { useSearch, useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Spinner, TextField } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'
import { useIntersectionObserver } from 'usehooks-ts'

import s from './PostsPage.module.scss'

function PostsPage() {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { clearSearchHandler, searchChangeHandler } = useSearch()
  const { isReady, query } = useRouter()
  const searchTerm = query.searchTerm ? query.searchTerm : ''

  const prevEndCursorRef = useRef(INITIAL_CURSOR)
  const { isIntersecting, ref: lastPostRef } = useIntersectionObserver({ root: null, threshold: 1 })

  const { data, fetchMore, loading } = useGetAllPostsQuery({
    skip: !isReady || !isAuth,
    variables: {
      endCursorPostId: INITIAL_CURSOR as QueryGetPostsArgs['endCursorPostId'],
      searchTerm: searchTerm as InputMaybe<QueryGetUsersArgs['searchTerm']>,
    },
  })

  // const { data: newPost, loading: loadingNewPost } = useOnPostAddedSubscription()

  const [fetching, setFetching] = useState(false)
  const postsList = data?.getPosts.items

  useEffect(() => {
    const newEndCursor = postsList?.[postsList?.length - 1].id

    if (newEndCursor) {
      if (prevEndCursorRef.current === newEndCursor) {
        return
      }

      if (isIntersecting) {
        setFetching(true)
        prevEndCursorRef.current = newEndCursor
        void fetchMore({
          variables: {
            endCursorPostId: newEndCursor,
            searchTerm: searchTerm as InputMaybe<QueryGetUsersArgs['searchTerm']>,
          },
        }).finally(() => setFetching(false))
      }
    }
  }, [isIntersecting, fetchMore, postsList, searchTerm])

  const isLoading = loading || fetching

  return (
    <Page pt={'36px'}>
      <div className={s.container}>
        <TextField
          label={t.postPage.searchLabel}
          onChange={searchChangeHandler}
          onClear={clearSearchHandler}
          placeholder={t.postPage.searchPlaceholder}
          value={searchTerm}
          variant={'search'}
        />
        <section className={s.postsContainer}>
          {postsList?.map((post, index) => {
            const lastPost = index === postsList.length - 1

            return <Post key={post.id} post={post} ref={lastPost ? lastPostRef : null} />
          })}
        </section>
        {isLoading && <Spinner label={t.loading} />}
      </div>
    </Page>
  )
}

PostsPage.getLayout = getNavigationLayout
export default PostsPage
