import { sleep } from '../../services/utils'
import { AuthData, AuthStatus } from '../../pages/a_DataAuth/types'
import AuthDataDb from './authdata-db.json'

export const authData = AuthDataDb as AuthData[]

// Simulate API calls

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof AuthData | undefined
  sortingOrder: 'asc' | 'desc' | null
  // 升序，降序，无
}

export type Filters = {
  authStatus: AuthStatus
  search: string
}

const getSortItem = (obj: any, sortBy: string) => {
  // 阉割版owner
  // if (sortBy === 'owner') {
  //   return obj.owner.fullname
  // }
  return obj[sortBy]
}

export const getAuthData = async (filters: Partial<Filters & Pagination & Sorting>) => {
  await sleep(1000)
  const { authStatus, search, sortBy, sortingOrder } = filters
  let filteredUsers = authData

  if (authStatus !== '') {
    filteredUsers = filteredUsers.filter((data) => data.status === authStatus)
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

export const addAuthData = async (data: AuthData) => {
  await sleep(1000)
  authData.unshift(data)
}

export const updateAuthData = async (data: AuthData) => {
  await sleep(1000)
  const index = authData.findIndex((u) => u.id === data.id)
  authData[index] = data
}

export const removeAuthData = async (data: AuthData) => {
  await sleep(1000)
  authData.splice(
    authData.findIndex((u) => u.id === data.id),
    1,
  )
}
