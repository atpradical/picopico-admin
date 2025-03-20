import { ComponentPropsWithoutRef, useContext, useEffect, useRef } from 'react'

import { INITIAL_CURSOR } from '@/features/users/config'
import { useGetPostsByUserQuery } from '@/services/posts'
import { QueryGetPostsByUserArgs } from '@/services/schema.types'
import { AuthContext } from '@/shared/context'
import { useTranslation } from '@/shared/hooks'
import { Spinner, TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useIntersectionObserver } from 'usehooks-ts'

import s from './UploadedPhotoTab.module.scss'

type UploadedPhotosTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const UploadedPhotosTab = ({ className, ...rest }: UploadedPhotosTabProps) => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { query } = useRouter()

  const userId = query.id ? query.id : ''

  const prevEndCursorRef = useRef(INITIAL_CURSOR)

  const { isIntersecting, ref: lastPostRef } = useIntersectionObserver({ root: null, threshold: 1 })

  const { data, fetchMore, loading } = useGetPostsByUserQuery({
    //TODO: GRPAHQL errors handling
    skip: !isAuth,
    variables: {
      endCursorId: INITIAL_CURSOR as QueryGetPostsByUserArgs['endCursorId'],
      userId: +userId as QueryGetPostsByUserArgs['userId'],
    },
  })

  const postsList = data?.getPostsByUser.items

  useEffect(() => {
    const newEndCursor = postsList?.[postsList?.length - 1].id

    if (newEndCursor) {
      if (prevEndCursorRef.current === newEndCursor) {
        return
      }

      if (isIntersecting) {
        prevEndCursorRef.current = newEndCursor
        void fetchMore({
          variables: {
            endCursorId: newEndCursor,
          },
        })
      }
    }
  }, [isIntersecting, fetchMore, postsList])

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      {postsList?.length ? (
        <section className={s.postsContainer}>
          {postsList.map((el, index) => {
            const isLastPost = postsList?.length - 1 === index

            return (
              <div
                className={s.imageContainer}
                key={el.id}
                ref={isLastPost ? lastPostRef : undefined}
              >
                <Image
                  alt={'post image'}
                  fill
                  sizes={'300px'}
                  src={el.url ?? '/apple-touch-icon-dark.png'}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )
          })}
        </section>
      ) : (
        <Typography>No posts created yet</Typography>
      )}
      {loading && <Spinner label={t.loading} />}
    </TabsContent>
  )
}
