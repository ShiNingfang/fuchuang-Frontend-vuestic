import { Ref, ref, unref, watch } from 'vue'
import { type Filters, Pagination, Sorting } from '../../../data/pages/authdata'
import { AuthData } from '../types'
import { watchIgnorable } from '@vueuse/core'
import { getAuthData } from '../../../api/dataget'
import { approveApply, rejectApply } from '../../../api/datapost.js'
import { useUserStore } from '../../../stores/user-store'
const userStore = useUserStore()

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
      id: userStore.id,
      filters: {
        ...unref(filters),
        ...unref(sorting),
        ...unref(pagination),
      },
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
    async agree(data: AuthData) {
      isLoading.value = true
      await approveApply(data)
      await fetch()
      isLoading.value = false
    },

    async remove(data: AuthData) {
      isLoading.value = true
      await rejectApply(data)
      await fetch()
      isLoading.value = false
    },
  }
}
