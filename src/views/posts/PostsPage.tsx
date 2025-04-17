import { useContext, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Post } from '@/features/posts/ui'
import { INITIAL_CURSOR } from '@/features/users/config'
import { BanUserFormFields, banUserSchemeCreator } from '@/features/users/model'
import { useGetAllPostsQuery } from '@/services/posts'
import { OnPostAddedSubscription, POST_ADDED_SUBSCRIPTION } from '@/services/posts/subscriptions'
import { InputMaybe, QueryGetPostsArgs, QueryGetUsersArgs } from '@/services/schema.types'
import { useBanUserMutation, useUnbanUserMutation } from '@/services/users'
import { AuthContext } from '@/shared/context'
import { useSearch, useTranslation } from '@/shared/hooks'
import { Page, getNavigationLayout } from '@/shared/ui/layout'
import { Spinner, TextField } from '@atpradical/picopico-ui-kit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useIntersectionObserver } from 'usehooks-ts'

import s from './PostsPage.module.scss'

function PostsPage() {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { clearSearchHandler, searchChangeHandler } = useSearch()
  const { isReady, query } = useRouter()
  const searchTerm = query.searchTerm ? query.searchTerm : ''
  const [fetching, setFetching] = useState(false)

  const methods = useForm<BanUserFormFields>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(banUserSchemeCreator(t.validation)),
  })

  const { handleSubmit } = methods

  const { data, fetchMore, loading, subscribeToMore } = useGetAllPostsQuery({
    skip: !isReady || !isAuth,
    variables: {
      endCursorPostId: INITIAL_CURSOR as QueryGetPostsArgs['endCursorPostId'],
      searchTerm: searchTerm as InputMaybe<QueryGetUsersArgs['searchTerm']>,
    },
  })

  const postsList = data?.getPosts.items

  useEffect(() => {
    if (!postsList) {
      return
    }

    subscribeToMore<OnPostAddedSubscription>({
      document: POST_ADDED_SUBSCRIPTION,
      updateQuery: (previousQueryResult, { subscriptionData, variables }) => {
        if (!subscriptionData.data) {
          return previousQueryResult
        }

        if (variables?.searchTerm) {
          return
        }

        const newPost = subscriptionData.data.postAdded

        // Проверяем, есть ли уже этот пост в списке
        const postExists = previousQueryResult.getPosts.items.some(post => post.id === newPost.id)

        // Если пост уже существует, ничего не меняем
        if (postExists) {
          return previousQueryResult
        }

        return Object.assign({}, previousQueryResult, {
          ...previousQueryResult,
          getPosts: {
            ...previousQueryResult.getPosts,
            items: [newPost, ...previousQueryResult.getPosts.items],
          },
        })
      },
    })
  }, [postsList, searchTerm, subscribeToMore])

  const prevEndCursorRef = useRef(INITIAL_CURSOR)
  const { isIntersecting, ref: lastPostRef } = useIntersectionObserver({ root: null, threshold: 1 })

  useEffect(() => {
    if (!postsList?.length) {
      return
    }
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

  const [banUserMutation, { loading: LoadingBan }] = useBanUserMutation({})

  const [unbanUserMutation, { loading: loadingUnBan }] = useUnbanUserMutation({})

  const isLoading = loading || fetching

  return (
    <>
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

              const userFullName = post.postOwner.firstName
                ? post.postOwner.firstName + ' ' + post.postOwner.lastName
                : post.postOwner.userName

              const handleBanUser = handleSubmit(async data => {
                const finalBanReason = data.customReason ? data.customReason : data.reason

                await banUserMutation({
                  update: cache => {
                    cache.modify({
                      fields: {
                        userBan(existingUserBan = {}) {
                          return {
                            ...existingUserBan,
                            createdAt: new Date().toISOString(),
                            reason: finalBanReason,
                          }
                        },
                      },
                      id: cache.identify({ __typename: 'Post', id: post.id }),
                    })
                  },
                  variables: { banReason: finalBanReason, userId: post.postOwner.id },
                })
              })

              const handleUnbanUser = async () => {
                await unbanUserMutation({
                  update: cache => {
                    cache.modify({
                      fields: {
                        userBan() {
                          return null
                        },
                      },
                      id: cache.identify({ __typename: 'Post', id: post.id }),
                    })
                  },
                  variables: { userId: post.postOwner.id },
                })
              }

              return (
                <FormProvider key={post.id} {...methods}>
                  <Post
                    isLoading={loading || LoadingBan || loadingUnBan}
                    onBanConfirm={handleBanUser}
                    onUnblockConfirm={handleUnbanUser}
                    post={post}
                    ref={lastPost ? lastPostRef : null}
                    userFullName={userFullName}
                  />
                </FormProvider>
              )
            })}
          </section>
          {isLoading && <Spinner label={t.loading} />}
        </div>
      </Page>
    </>
  )
}

PostsPage.getLayout = getNavigationLayout
export default PostsPage
