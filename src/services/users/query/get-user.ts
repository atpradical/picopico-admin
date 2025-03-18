import { gql } from '@apollo/client'

export const GET_USER = gql`
  query getUser($userId: Int!) {
    getUser(userId: $userId) {
      createdAt
      userName
      id
      profile {
        lastName
        firstName
        avatars {
          url
          width
        }
      }
    }
  }
`
