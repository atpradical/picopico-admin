import { gql } from '@apollo/client'

export const POST_ADDED_SUBSCRIPTION = gql`
  subscription OnPostAdded {
    postAdded {
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
  }
`
