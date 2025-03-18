import { gql } from '@apollo/client'

export const GET_FOLLOWING = gql`
  query getFollowing($userId: Int!, $pageSize: Int, $pageNumber: Int) {
    getFollowing(pageSize: $pageSize, pageNumber: $pageNumber, userId: $userId) {
      items {
        userId
        id
        userName
        createdAt
      }
      totalCount
      pageSize
      page
      pagesCount
    }
  }
`
