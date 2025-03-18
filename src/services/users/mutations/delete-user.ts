import { gql } from '@apollo/client'

export const DELETE_USER = gql`
  mutation DeleteUser($userId: Int!) {
    removeUser(userId: $userId)
  }
`
