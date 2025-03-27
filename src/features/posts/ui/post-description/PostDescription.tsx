import { MAX_POST_VISIBLE_DESCRIPTION_LENGTH } from '@/features/posts/config'
import { GetAllPostsQuery } from '@/services/posts'
import { useTranslation } from '@/shared/hooks'
import { Button, Typography } from '@atpradical/picopico-ui-kit'

import s from './PostDescription.module.scss'

type Props = {
  expand: boolean
  onToggle: () => void
  post: NonNullable<GetAllPostsQuery['getPosts']['items'][number]>
}
export const PostDescription = ({ expand, onToggle, post }: Props) => {
  const { t } = useTranslation()
  const showToggleButton = post.description.length > MAX_POST_VISIBLE_DESCRIPTION_LENGTH

  return (
    <div className={s.descriptionContainer}>
      <Typography className={s.descriptionText}>
        {expand || post.description.length <= MAX_POST_VISIBLE_DESCRIPTION_LENGTH
          ? post.description
          : post.description.slice(0, MAX_POST_VISIBLE_DESCRIPTION_LENGTH) + '...'}
        {showToggleButton && (
          <Button className={s.toggleButton} onClick={onToggle} variant={'link'}>
            {showToggleButton
              ? t.postDescription.collapsePostDescriptionButton
              : t.postDescription.expandPostDescriptionButton}
          </Button>
        )}
      </Typography>
    </div>
  )
}
