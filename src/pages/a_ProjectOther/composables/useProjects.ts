import { Ref, ref, unref } from 'vue'
import { Sorting, Pagination } from '../../../data/pages/projects'
import { Project } from '../types'
import { watchIgnorable } from '@vueuse/core'
import { getOtherProject } from '../../../api/projectget'
import { useUserStore } from '../../../stores/user-store'
const userStore = useUserStore()

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'creation_date', sortingOrder: 'desc' })

export const useProjects = (options?: { sorting?: Ref<Sorting>; pagination?: Ref<Pagination> }) => {
  const isLoading = ref(false)
  const projects = ref<Project[]>([])

  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options ?? {}

  const fetch = async () => {
    isLoading.value = true
    const { data, pagination: newPagination } = await getOtherProject({
      id: userStore.id,
      filters: {
        ...unref(sorting),
        ...unref(pagination),
      },
    })
    projects.value = data as Project[]
    console.log(projects.value)

    ignoreUpdates(() => {
      pagination.value = newPagination
    })

    isLoading.value = false
  }

  const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  fetch()

  return {
    isLoading,

    projects,

    fetch,

    pagination,
    sorting,
  }
}
