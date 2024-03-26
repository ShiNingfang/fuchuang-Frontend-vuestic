import { sleep } from '../../services/utils'
import { MineData, MineStatus } from '../../pages/a_DataMine/types'
import MineDataDb from './minedata-db.json'

export const mineData = MineDataDb as MineData[]

// Simulate API calls

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof MineData | undefined
  sortingOrder: 'asc' | 'desc' | null
  // 升序，降序，无
}

export type Filters = {
  mineStatus: MineStatus
  search: string
}

const getSortItem = (obj: any, sortBy: string) => {
  // 阉割版owner
  // if (sortBy === 'owner') {
  //   return obj.owner.fullname
  // }
  return obj[sortBy]
}

export const getMineData = async (filters: Partial<Filters & Pagination & Sorting>) => {
  await sleep(1000)
  const { mineStatus, search, sortBy, sortingOrder } = filters
  let filteredUsers = mineData

  if (mineStatus !== '') {
    filteredUsers = filteredUsers.filter((data) => data.status === mineStatus)
  } else {
    filteredUsers = filteredUsers.filter((data) => data.status !== 'deleted')
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

export const addMineData = async (data: MineData) => {
  await sleep(1000)
  mineData.unshift(data)
}

export const updateMineData = async (data: MineData) => {
  await sleep(1000)
  const index = mineData.findIndex((u) => u.id === data.id)
  mineData[index] = data
}

export const removeMineData = async (data: MineData) => {
  await sleep(1000)
  mineData.splice(
    mineData.findIndex((u) => u.id === data.id),
    1,
  )
}
