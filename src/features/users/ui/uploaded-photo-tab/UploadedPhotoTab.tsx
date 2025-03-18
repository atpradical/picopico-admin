import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'

import { PostDialog } from '@/features/posts/ui'
import { Publication } from '@/features/publication/ui'
import { INITIAL_CURSOR } from '@/features/users/config'
import { usePagesRouterQueryUpdate } from '@/shared/hooks/usePagesRouterQueryUpdate'
import { Nullable } from '@/shared/types'
import { TabsContent, Typography } from '@atpradical/picopico-ui-kit'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import clsx from 'clsx'

import s from './UploadedPhotoTab.module.scss'

type UploadedPhotosTabProps = ComponentPropsWithoutRef<typeof TabsContent>

export const UploadedPhotosTab = ({ className, ...rest }: UploadedPhotosTabProps) => {
  const mockPosts = [
    {
      avatarOwner:
        'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
      avatarWhoLikes: false,
      createdAt: '2025-03-10T14:21:08.274Z',
      description: 'description',
      id: 1,
      images: [
        {
          createdAt: '2025-03-10T14:21:07.964Z',
          fileSize: 300,
          height: 300,
          uploadId: 'string',
          url: 'https://example.com/image.jpg',
          width: 300,
        },
      ],
      isLiked: true,
      likesCount: 1,
      location: 'location',
      owner: {
        firstName: 'firstName',
        lastName: 'lastName',
      },
      ownerId: 1,
      updatedAt: '2025-03-10T14:21:08.274Z',
      userName: 'Alex',
    },
  ]
  const { addRouterQueryParamShallow } = usePagesRouterQueryUpdate()
  const [cursor, setCursor] = useState(INITIAL_CURSOR)
  const [showPost, setShowPost] = useState(false)
  const [post, setPost] = useState<Nullable<number>>(null)

  const sectionRef = useRef(null)
  const [lastPostRef, entry] = useIntersectionObserver({ root: null, threshold: 1 })

  useEffect(() => {
    if (mockPosts.length && entry?.isIntersecting && updateCursor) {
      updateCursor(mockPosts[mockPosts.length - 1].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting, mockPosts.length])

  const displayPost = (postId: number) => {
    addRouterQueryParamShallow({ postId: String(postId) })
    const postData = mockPosts.find(item => item.id === postId)

    if (postData) {
      setShowPost(true)
      setPost(1)
    }
  }

  const updateCursor = (postId: number) => {
    setCursor(postId)
  }

  return (
    <TabsContent className={clsx(s.content, className)} {...rest}>
      <Typography grey variant={'large'}>
        Uploaded Photos Data
      </Typography>
      <section className={s.postsContainer} ref={sectionRef}>
        {mockPosts.map((el, index) => {
          return (
            <Publication
              isCarousel={mockPosts.length > 1}
              isLastPost={mockPosts.length === index + 1}
              key={el.id}
              onClick={() => displayPost(123456)}
              post={el}
              ref={lastPostRef}
            />
          )
        })}
        {/*TODO: POST fix post display dialog*/}
        <PostDialog onOpenChange={setShowPost} open={showPost} postData={mockPosts[0]} />
      </section>
      <Typography variant={'error'}>Tab in development...</Typography>
    </TabsContent>
  )
}
