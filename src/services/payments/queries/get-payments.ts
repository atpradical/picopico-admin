import { PAYMENTS_PAGINATION_FRAGMENT } from '@/services/fragments'
import { gql } from '@apollo/client'

export const GET_PAYMENTS = gql`
  ${PAYMENTS_PAGINATION_FRAGMENT}
  query getPayments(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
  ) {
    getPayments(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      items {
        id
        userId
        userName
        createdAt
        endDate
        amount
        paymentMethod
        type
        avatars {
          url
          width
        }
      }
      ...PaymentsPaginationFieldsFragment # Использование фрагмента
    }
  }
`
