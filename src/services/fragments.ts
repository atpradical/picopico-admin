import { gql } from '@apollo/client'

export const PAGINATION_FRAGMENT = gql`
  fragment PaginationFieldsFragment on PaginationModel {
    pagesCount
    page
    pageSize
    totalCount
  }
`

export const PAYMENTS_PAGINATION_FRAGMENT = gql`
  fragment PaymentsPaginationFieldsFragment on PaymentsPaginationModel {
    pagesCount
    page
    pageSize
    totalCount
  }
`
