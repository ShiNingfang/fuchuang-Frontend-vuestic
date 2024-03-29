import { Ref, ref, unref } from 'vue'
import { updateProject, removeProject, Sorting, Pagination } from '../../../data/pages/projects'
import { Project, pjtUser } from '../types'
import { watchIgnorable } from '@vueuse/core'
import { getMineProject, getAvailable } from '../../../api/projectget'
import { createProject } from '../../../api/projectpost'
import { useUserStore } from '../../../stores/user-store'
const userStore = useUserStore()

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'creation_date', sortingOrder: 'desc' })

export const useProjects = (options?: { sorting?: Ref<Sorting>; pagination?: Ref<Pagination> }) => {
  const isLoading = ref(false)
  const projects = ref<Project[]>([])
  const cooperators = ref<pjtUser[]>([])

  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options ?? {}

  const fetch = async () => {
    isLoading.value = true
    const { data, pagination: newPagination } = await getMineProject({
      id: userStore.id,
      filters: {
        ...unref(sorting),
        ...unref(pagination),
      },
    })
    projects.value = data as Project[]
    // console.log(projects.value)

    ignoreUpdates(() => {
      pagination.value = newPagination
    })

    isLoading.value = false
  }

  const getCooperator = async () => {
    isLoading.value = true
    // await getAvailable({
    //   id: userStore.id,
    // }).then((res) => {
    //   console.log(res.data)
    //   cooperators.value = res.data as pjtUser[]
    // })

    const { data } = await getAvailable({
      id: userStore.id,
    })
    // projects.value = data as Project[]
    cooperators.value = data as pjtUser[]
    console.log(cooperators.value)

    isLoading.value = false
  }

  const { ignoreUpdates } = watchIgnorable([pagination, sorting], fetch, { deep: true })

  fetch()
  getCooperator()

  return {
    isLoading,

    projects,
    cooperators,

    fetch,
    getCooperator,

    async add(project: Project) {
      isLoading.value = true
      await createProject(
        // id: project.id,
        // project_name: project.project_name,
        // project_owner: project.project_owner,
        // team: project.team,
        // type: project.type,
        // description: project.description,
        // creation_date: project.creation_date,
        project,
      )
      await fetch()
      isLoading.value = false
    },

    // async update(project: Project) {
    //   isLoading.value = true
    //   await updateProject({
    //     ...project,
    //     project_owner: project.project_owner.id,
    //     team: project.team.map((user) => user.id),
    //   })
    //   await fetch()
    //   isLoading.value = false
    // },

    // async remove(project: Project) {
    //   isLoading.value = true
    //   await removeProject({
    //     ...project,
    //     project_owner: project.project_owner.id,
    //     team: project.team.map((user) => user.id),
    //   })
    //   await fetch()
    //   isLoading.value = false
    // },

    pagination,
    sorting,
  }
}
