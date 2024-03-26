import { Ref, ref, unref, watch } from 'vue'
import {
  getAuthData,
  updateAuthData,
  addAuthData,
  removeAuthData,
  type Filters,
  Pagination,
  Sorting,
} from '../../../data/pages/authdata'
import { AuthData } from '../types'
import { watchIgnorable } from '@vueuse/core'

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'name', sortingOrder: null })
const makeFiltersRef = () => ref<Partial<Filters>>({ authStatus: '', search: '' })

export const useAuthData = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const authData = ref<AuthData[]>([])

  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    const { data, pagination: newPagination } = await getAuthData({
      ...unref(filters),
      ...unref(sorting),
      ...unref(pagination),
    })
    authData.value = data

    ignoreUpdates(() => {
      pagination.value = newPagination
    })

    isLoading.value = false
  }

  const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  watch(
    filters,
    () => {
      // Reset pagination to first page when filters changed
      pagination.value.page = 1
      fetch()
    },
    { deep: true },
  )

  fetch()

  return {
    isLoading,

    filters,
    sorting,
    pagination,

    authData,

    fetch,

    async add(data: AuthData) {
      isLoading.value = true
      await addAuthData(data)
      await fetch()
      isLoading.value = false
    },

    async update(data: AuthData) {
      isLoading.value = true
      await updateAuthData(data)
      await fetch()
      isLoading.value = false
    },

    async remove(data: AuthData) {
      isLoading.value = true
      await removeAuthData(data)
      await fetch()
      isLoading.value = false
    },
  }
}
