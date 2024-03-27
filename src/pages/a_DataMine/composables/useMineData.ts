import { Ref, ref, unref, watch } from 'vue'
import { type Filters, Pagination, Sorting } from '../../../data/pages/minedata'
import { MineData } from '../types'
import { watchIgnorable } from '@vueuse/core'
import { getMineData } from '../../../api/dataget'
import { createMineData, changeMineDataState } from '../../../api/datapost.js'
import { useUserStore } from '../../../stores/user-store'
const userStore = useUserStore()

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
      id: userStore.id,
      filters: {
        ...unref(filters),
        ...unref(sorting),
        ...unref(pagination),
      },
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
      await createMineData({
        owner_id: data.owner,
        name: data.name, // 样本名称
        number: data.number, // 图片数量
        description: data.description, // 描述
        path: data.path, // 样本地址
        auth_number: data.auth_number, // 授权数
        upload_time: data.upload_time, // 上传时间
      })
      await fetch()
      isLoading.value = false
    },

    async changeState(data: MineData) {
      isLoading.value = true
      await changeMineDataState({
        id: data.id,
        status: data.status === 'public' ? 'pricate' : 'public',
      })
      await fetch()
      isLoading.value = false
    },

    async remove(data: MineData) {
      isLoading.value = true
      await changeMineDataState({
        id: data.id,
        status: 'deleted',
      })
      await fetch()
      isLoading.value = false
    },
  }
}
