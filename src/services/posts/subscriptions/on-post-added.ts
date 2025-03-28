import { gql } from '@apollo/client'

export const POST_ADDED_SUBSCRIPTION = gql`
  subscription OnPostAdded {
    postAdded {
      id
      description
      createdAt
      ownerId
      updatedAt
      images {
        url
        createdAt
        id
        width
      }
      userBan {
        createdAt
        reason
      }
    }
  }
`
