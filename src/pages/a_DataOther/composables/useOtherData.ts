import { Ref, ref, unref, watch } from 'vue'
import {
  getOtherData,
  updateOtherData,
  addOtherData,
  removeOtherData,
  type Filters,
  Pagination,
  Sorting,
} from '../../../data/pages/otherdata'
import { OtherData } from '../types'
import { watchIgnorable } from '@vueuse/core'

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'name', sortingOrder: null })
const makeFiltersRef = () => ref<Partial<Filters>>({ otherStatus: '', search: '' })

export const useOtherData = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const otherData = ref<OtherData[]>([])

  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    const { data, pagination: newPagination } = await getOtherData({
      ...unref(filters),
      ...unref(sorting),
      ...unref(pagination),
    })
    otherData.value = data

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

    otherData,

    fetch,

    async add(data: OtherData) {
      isLoading.value = true
      await addOtherData(data)
      await fetch()
      isLoading.value = false
    },

    async update(data: OtherData) {
      isLoading.value = true
      await updateOtherData(data)
      await fetch()
      isLoading.value = false
    },

    async remove(data: OtherData) {
      isLoading.value = true
      await removeOtherData(data)
      await fetch()
      isLoading.value = false
    },
  }
}
