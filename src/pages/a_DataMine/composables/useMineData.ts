import { Ref, ref, unref, watch } from 'vue'
import {
  getMineData,
  updateMineData,
  addMineData,
  removeMineData,
  type Filters,
  Pagination,
  Sorting,
} from '../../../data/pages/minedata'
import { MineData } from '../types'
import { watchIgnorable } from '@vueuse/core'

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'name', sortingOrder: null })
const makeFiltersRef = () => ref<Partial<Filters>>({ mineStatus: '', search: '' })

export const useMineData = (options?: {
  pagination?: Ref<Pagination>
  sorting?: Ref<Sorting>
  filters?: Ref<Partial<Filters>>
}) => {
  const isLoading = ref(false)
  const mineData = ref<MineData[]>([])

  const { filters = makeFiltersRef(), sorting = makeSortingRef(), pagination = makePaginationRef() } = options || {}

  const fetch = async () => {
    isLoading.value = true
    const { data, pagination: newPagination } = await getMineData({
      ...unref(filters),
      ...unref(sorting),
      ...unref(pagination),
    })
    mineData.value = data

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

    mineData,

    fetch,

    async add(data: MineData) {
      isLoading.value = true
      await addMineData(data)
      await fetch()
      isLoading.value = false
    },

    async update(data: MineData) {
      isLoading.value = true
      await updateMineData(data)
      await fetch()
      isLoading.value = false
    },

    async remove(data: MineData) {
      isLoading.value = true
      await removeMineData(data)
      await fetch()
      isLoading.value = false
    },
  }
}
