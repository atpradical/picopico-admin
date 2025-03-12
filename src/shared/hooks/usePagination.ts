import { useMemo, useState } from 'react'

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 1
const PAGE_STEP = 1

type PaginationProps<T> = {
  data: T[]
  initialPageSize?: number
}

type PaginationReturnType<T> = {
  changePage: (page: number) => void
  changePageSize: (value: string) => void
  currentPage: number
  nextPage: () => void
  pageSize: number
  paginatedData: T[]
  prevPage: () => void
  totalCount: number
}

export const usePagination = <T>({
  data,
  initialPageSize = DEFAULT_PAGE_SIZE,
}: PaginationProps<T>): PaginationReturnType<T> => {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const totalCount = data?.length ?? 0

  const paginatedData = useMemo(() => {
    if (!data) {
      return []
    }

    const startIndex = (currentPage - PAGE_STEP) * pageSize
    const endIndex = startIndex + pageSize

    return data.slice(startIndex, endIndex)
  }, [data, currentPage, pageSize])

  const nextPage = () => {
    setCurrentPage(value => value + PAGE_STEP)
  }

  const prevPage = () => {
    setCurrentPage(value => value - PAGE_STEP)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  const changePageSize = (value: string) => {
    setPageSize(+value)
    setCurrentPage(1)
  }

  return {
    changePage,
    changePageSize,
    currentPage,
    nextPage,
    pageSize,
    paginatedData,
    prevPage,
    totalCount,
  }
}
