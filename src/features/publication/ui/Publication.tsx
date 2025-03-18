import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { GetPostsByUserQuery } from '@/services/posts'
import { useTranslation } from '@/shared/hooks'
import { Card, LayersOutlineIcon, Typography } from '@atpradical/picopico-ui-kit'
import { useRouter } from 'next/router'

import s from './Publication.module.scss'

type PublicationProps = {
  isCarousel: boolean
  isLastPost?: boolean
  isLink?: Boolean
  onClick?: () => void
  post: NonNullable<GetPostsByUserQuery['getPostsByUser']['items']>[number]
  showDescription?: boolean
} & ComponentPropsWithoutRef<'div'>

type PublicationRef = ElementRef<'div'>

export const Publication = forwardRef<PublicationRef, PublicationProps>(
  ({ isCarousel, isLastPost, isLink, onClick, post, showDescription = false, ...rest }, ref) => {
    const { locale } = useRouter()
    const { t } = useTranslation()

    // const formattedCreatedAt = getDateDistanceToNow(new Date(post.updatedAt), locale ?? 'en')

    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false)

    // const isDescriptionToggleButton =
    //   post.description.length > MAX_EXPANDED_POST_DESCRIPTION_CHAR_AMOUNT

    const toggleDescription = () => {
      setDescriptionExpanded(!isDescriptionExpanded)
    }

    return (
      <div className={s.publicationContainer} {...rest}>
        {/*todo: CHECK Хорошее ли решение использовать Link для редиректов?*/}
        <Card
          className={s.imageContainer}
          key={post.id}
          onClick={onClick}
          ref={isLastPost ? ref : undefined}
        >
          {/*<Image*/}
          {/*  alt={'post image'}*/}
          {/*  fill*/}
          {/*  sizes={'300px'}*/}
          {/*  // src={post.images[0]?.url ?? '/apple-touch-icon-dark.png'}*/}
          {/*  style={{ objectFit: 'cover' }}*/}
          {/*/>*/}
          {isCarousel && <LayersOutlineIcon className={s.layersIcon} />}
        </Card>
        {showDescription && (
          <>
            {/*<Avatar showUserName size={'xs'} src={post.avatarOwner} userName={post.userName} />*/}
            <div className={s.publicationMeta}>
              <Typography grey variant={'small'}>
                {/*{formattedCreatedAt}*/}
              </Typography>
              <div className={s.descriptionContainer}>
                <Typography className={isDescriptionExpanded ? s.expanded : s.collapsed}>
                  {/*{post.description}*/}
                </Typography>
                {/*{isDescriptionToggleButton && (*/}
                {/*  <Button className={s.toggleButton} onClick={toggleDescription} variant={'link'}>*/}
                {/*    {isDescriptionExpanded*/}
                {/*      ? t.postDescription.collapsePostDescriptionButton*/}
                {/*      : t.postDescription.expandPostDescriptionButton}*/}
                {/*  </Button>*/}
                {/*)}*/}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
)
