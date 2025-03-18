import { gql } from '@apollo/client'

export const GET_FOLLOWERS = gql`
  query getFollowers($userId: Int!, $pageSize: Int, $pageNumber: Int) {
    getFollowers(pageSize: $pageSize, pageNumber: $pageNumber, userId: $userId) {
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
