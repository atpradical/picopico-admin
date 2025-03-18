import { gql } from '@apollo/client'

export const GET_PAYMENTS_BY_USER = gql`
  query getPaymentsByUser($userId: Int!, $pageNumber: Int, $pageSize: Int) {
    getPaymentsByUser(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {
      items {
        dateOfPayment
        id
        type
        endDate
        price
        paymentType
      }
      totalCount
      pageSize
      page
      pagesCount
    }
  }
`
