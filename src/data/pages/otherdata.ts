import { sleep } from '../../services/utils'
import { OtherData, OtherStatus } from '../../pages/a_DataOther/types'
import OtherDataDb from './otherdata-db.json'

export const otherData = OtherDataDb as OtherData[]

// Simulate API calls

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof OtherData | undefined
  sortingOrder: 'asc' | 'desc' | null
  // 升序，降序，无
}

export type Filters = {
  otherStatus: OtherStatus
  search: string
}

const getSortItem = (obj: any, sortBy: string) => {
  if (sortBy === 'owner') {
    return obj.owner.fullname
  }
  return obj[sortBy]
}

export const getOtherData = async (filters: Partial<Filters & Pagination & Sorting>) => {
  await sleep(1000)
  const { otherStatus, search, sortBy, sortingOrder } = filters
  let filteredUsers = otherData

  if (otherStatus !== '') {
    filteredUsers = filteredUsers.filter((data) => data.status === otherStatus)
  }

  if (search) {
    filteredUsers = filteredUsers.filter((data) => data.name.toLowerCase().includes(search.toLowerCase()))
  }

  filteredUsers = filteredUsers.map((data) => ({ ...data }))

  if (sortBy && sortingOrder) {
    filteredUsers = filteredUsers.sort((a, b) => {
      const first = getSortItem(a, sortBy)
      const second = getSortItem(b, sortBy)
      if (first > second) {
        return sortingOrder === 'asc' ? 1 : -1
      }
      if (first < second) {
        return sortingOrder === 'asc' ? -1 : 1
      }
      return 0
    })
  }

  const { page = 1, perPage = 10 } = filters || {}
  return {
    data: filteredUsers.slice((page - 1) * perPage, page * perPage),
    pagination: {
      page,
      perPage,
      total: filteredUsers.length,
    },
  }
}

export const addOtherData = async (data: OtherData) => {
  await sleep(1000)
  otherData.unshift(data)
}

export const updateOtherData = async (data: OtherData) => {
  await sleep(1000)
  const index = otherData.findIndex((u) => u.id === data.id)
  otherData[index] = data
}

export const removeOtherData = async (data: OtherData) => {
  await sleep(1000)
  otherData.splice(
    otherData.findIndex((u) => u.id === data.id),
    1,
  )
}
