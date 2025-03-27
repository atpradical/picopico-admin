import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { MAX_POST_VISIBLE_DESCRIPTION_LENGTH } from '@/features/posts/config'
import { GetAllPostsQuery } from '@/services/posts'
import { useTranslation } from '@/shared/hooks'
import { getDateDistanceToNow } from '@/shared/utils'
import {
  Avatar,
  BlockIcon,
  Button,
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ImageOutlineIcon,
  RadioButtonUncheckedIcon,
  Typography,
} from '@atpradical/picopico-ui-kit'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './Post.module.scss'

type PostProps = {
  post: NonNullable<GetAllPostsQuery['getPosts']['items'][number]>
} & ComponentPropsWithoutRef<'div'>

type PostPropsRef = ElementRef<'div'>

export const Post = forwardRef<PostPropsRef, PostProps>(({ post, ...rest }, ref) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const formattedCreatedAt = getDateDistanceToNow(new Date(post.createdAt), locale ?? 'en')

  const [expand, setExpand] = useState(false)

  const showToggleButton = post.description.length > MAX_POST_VISIBLE_DESCRIPTION_LENGTH

  const toggleDescription = () => {
    setExpand(!expand)
  }

  const isBlock = !!post.userBan?.createdAt

  return (
    <div className={s.publicationContainer} {...rest} ref={ref}>
      {post.images?.[0]?.url ? (
        <Carousel className={s.carousel}>
          <CarouselContent>
            {post.images?.map(image => {
              return (
                <CarouselItem key={image.id}>
                  <div className={clsx(s.imageContainer, expand ? s.expanded : s.collapsed)}>
                    <Image
                      alt={'post image'}
                      fill
                      sizes={'300px'}
                      src={post.images?.[0]?.url ?? '/apple-touch-icon-dark.png'}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDotButtons />
        </Carousel>
      ) : (
        <div className={s.noImage}>
          <ImageOutlineIcon />
          <Typography grey variant={'small'}>
            Image not exist
          </Typography>
        </div>
      )}
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
        <div className={s.descriptionContainer}>
          <Typography className={s.descriptionText}>
            {expand || post.description.length <= MAX_POST_VISIBLE_DESCRIPTION_LENGTH
              ? post.description
              : post.description.slice(0, MAX_POST_VISIBLE_DESCRIPTION_LENGTH) + '...'}
            {showToggleButton && (
              <Button className={s.toggleButton} onClick={toggleDescription} variant={'link'}>
                {showToggleButton
                  ? t.postDescription.collapsePostDescriptionButton
                  : t.postDescription.expandPostDescriptionButton}
              </Button>
            )}
          </Typography>
        </div>
      </div>
    </div>
  )
})
