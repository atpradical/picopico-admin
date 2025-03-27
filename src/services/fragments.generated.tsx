import * as Types from './schema.types'

import { gql } from '@apollo/client'
export type PaginationFieldsFragmentFragment = {
  __typename?: 'PaginationModel'
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
}

export type PaymentsPaginationFieldsFragmentFragment = {
  __typename?: 'PaymentsPaginationModel'
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
}

export type AllPostsPaginationFieldsFragmentFragment = {
  __typename?: 'PostsPaginationModel'
  pagesCount: number
  pageSize: number
  totalCount: number
}

export const PaginationFieldsFragmentFragmentDoc = gql`
  fragment PaginationFieldsFragment on PaginationModel {
    pagesCount
    page
    pageSize
    totalCount
  }
`
export const PaymentsPaginationFieldsFragmentFragmentDoc = gql`
  fragment PaymentsPaginationFieldsFragment on PaymentsPaginationModel {
    pagesCount
    page
    pageSize
    totalCount
  }
`
export const AllPostsPaginationFieldsFragmentFragmentDoc = gql`
  fragment AllPostsPaginationFieldsFragment on PostsPaginationModel {
    pagesCount
    pageSize
    totalCount
  }
`
