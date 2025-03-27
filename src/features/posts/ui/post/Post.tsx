import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { MockPostImage, PostCarousel, PostDescription } from '@/features/posts/ui'
import { GetAllPostsQuery } from '@/services/posts'
import { getDateDistanceToNow } from '@/shared/utils'
import {
  Avatar,
  BlockIcon,
  Button,
  RadioButtonUncheckedIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './Post.module.scss'

type PostProps = {
  post: NonNullable<GetAllPostsQuery['getPosts']['items'][number]>
} & ComponentPropsWithoutRef<'div'>

type PostPropsRef = ElementRef<'div'>

export const Post = forwardRef<PostPropsRef, PostProps>(({ post, ...rest }, ref) => {
  const { locale } = useRouter()

  const formattedCreatedAt = getDateDistanceToNow(new Date(post.createdAt), locale ?? 'en')

  const [expand, setExpand] = useState(false)
  const toggleDescription = () => {
    setExpand(!expand)
  }

  const isBlock = !!post.userBan?.createdAt

  return (
    <div className={s.publicationContainer} {...rest} ref={ref}>
      {post.images?.[0]?.url ? <PostCarousel expand={expand} post={post} /> : <MockPostImage />}
      <div className={s.avatarContainer}>
        <Avatar
          showFallback
          showUserName
          size={'xs'}
          src={post.postOwner.avatars?.[0]?.url ?? ''}
          userName={post.postOwner.userName}
        />
        {isBlock ? (
          <>
            <Button title={'unban user'} variant={'icon'}>
              <BlockIcon />
            </Button>
          </>
        ) : (
          <>
            <Button title={'ban user'} variant={'icon'}>
              <RadioButtonUncheckedIcon />
            </Button>
          </>
        )}
      </div>
      <div>
        <Typography grey variant={'small'}>
          {formattedCreatedAt}
        </Typography>
        <PostDescription expand={expand} onToggle={toggleDescription} post={post} />
      </div>
    </div>
  )
})
