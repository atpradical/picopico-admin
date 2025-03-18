import { ComponentPropsWithoutRef, useContext, useRef, useState } from 'react'

import { INITIAL_CURSOR } from '@/features/users/config'
import { useGetPostsByUserQuery } from '@/services/posts'
import { QueryGetPostsByUserArgs } from '@/services/schema.types'
import { AuthContext } from '@/shared/context'
import { useTranslation } from '@/shared/hooks'
import { usePagesRouterQueryUpdate } from '@/shared/hooks/usePagesRouterQueryUpdate'
import { Card, Spinner, TabsContent, Typography } from '@atpradical/picopico-ui-kit'
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

  const [cursor, setCursor] = useState(INITIAL_CURSOR)

  const sectionRef = useRef(null)
  const [lastPostRef, entry] = useIntersectionObserver({ root: null, threshold: 1 })

  const { data, loading } = useGetPostsByUserQuery({
    //TODO: GRPAHQL errors handling
    skip: !isAuth,
    variables: {
      endCursorId: cursor as QueryGetPostsByUserArgs['endCursorId'],
      userId: +userId as QueryGetPostsByUserArgs['userId'],
    },
  })

  const { addRouterQueryParamShallow } = usePagesRouterQueryUpdate()

  const postsList = data?.getPostsByUser.items

  // useEffect(() => {
  //   if (postsList.length && entry?.isIntersecting && updateCursor) {
  //     updateCursor(postsList[postsList.length - 1].id)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [entry?.isIntersecting, postsList.length])

  const updateCursor = (postId: number) => {
    setCursor(postId)
  }

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      {postsList?.length ? (
        <section className={s.postsContainer}>
          {postsList.map((el, index) => {
            const isLastPost = postsList?.length === 1

            return (
              <Card
                className={s.imageContainer}
                key={el.id}
                ref={isLastPost ? sectionRef : undefined}
              >
                <Image
                  alt={'post image'}
                  fill
                  sizes={'300px'}
                  src={el.url ?? '/apple-touch-icon-dark.png'}
                  style={{ objectFit: 'cover' }}
                />
              </Card>
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
