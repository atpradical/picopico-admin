import { ALL_POSTS_PAGINATION_FRAGMENT } from '@/services/fragments'
import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
  ${ALL_POSTS_PAGINATION_FRAGMENT}
  query GetAllPosts(
    $endCursorPostId: Int
    $searchTerm: String
    $pageSize: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      searchTerm: $searchTerm
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        description
        postOwner {
          id
          userName
          firstName
          lastName
          avatars {
            url
            width
          }
        }
        id
        userBan {
          createdAt
        }
        images {
          id
          fileSize
          createdAt
          height
          url
          width
        }
      }
      ...AllPostsPaginationFieldsFragment
    }
  }
`
