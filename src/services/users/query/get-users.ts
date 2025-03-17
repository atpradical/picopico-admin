import { PAGINATION_FRAGMENT } from '@/services/fragments'
import { gql } from '@apollo/client'

export const GET_USERS = gql`
  ${PAGINATION_FRAGMENT}
  query getUsers(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
    $statusFilter: UserBlockStatus
  ) {
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
      statusFilter: $statusFilter
    ) {
      pagination {
        ...PaginationFieldsFragment # Использование фрагмента
      }
      users {
        email
        userName
        createdAt
        id
        profile {
          id
          firstName
          lastName
        }
        userBan {
          createdAt
          reason
        }
      }
    }
  }
`
