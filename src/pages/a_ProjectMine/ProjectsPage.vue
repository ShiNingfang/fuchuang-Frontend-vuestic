<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useProjects } from './composables/useProjects'
import ProjectCards from './widgets/ProjectCards.vue'
import ProjectTable from './widgets/ProjectsTable.vue'
import EditProjectForm from './widgets/EditProjectForm.vue'
import { Project } from './types'
import { useModal, useToast } from 'vuestic-ui'

const doShowAsCards = useLocalStorage('projects-view', true)

const { projects, add, isLoading, pagination, sorting } = useProjects() // update, remove
// 项目列表，更新，添加，是否转圈，删除，分页指示，排序数据（依据，list）

const projectToEdit = ref<Project | null>(null)
const doShowProjectFormModal = ref(false)

const editProject = (project: Project) => {
  projectToEdit.value = project
  doShowProjectFormModal.value = true
}

const createNewProject = () => {
  projectToEdit.value = null
  doShowProjectFormModal.value = true
}

const { init: notify } = useToast()

const onProjectSaved = async (project: Project) => {
  doShowProjectFormModal.value = false
  await add(project as Project)
  notify({
    message: 'Project created',
    color: 'success',
  })
  // if ('id' in project) {
  //   await update(project as Project)
  //   notify({
  //     message: 'Project updated',
  //     color: 'success',
  //   })
  // } else {
  //   await add(project as Project)
  //   notify({
  //     message: 'Project created',
  //     color: 'success',
  //   })
  // }
}

const { confirm } = useModal()

const onProjectDeleted = async (project: Project) => {
  const response = await confirm({
    title: 'Delete project',
    message: `Are you sure you want to delete project "${project.project_name}"?`,
    okText: 'Delete',
    size: 'small',
    maxWidth: '380px',
  })

  if (!response) {
    return
  }

  // await remove(project)
  notify({
    message: 'Project deleted',
    color: 'success',
  })
}

const editFormRef = ref()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: 'Form has unsaved changes. Are you sure you want to close it?',
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}
</script>

<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col justify-between gap-2 mb-2 md:flex-row">
        <div class="flex flex-col justify-start gap-2 md:flex-row">
          <VaButtonToggle
            v-model="doShowAsCards"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: 'Cards', value: true },
              { label: 'Table', value: false },
            ]"
          />
        </div>
        <VaButton icon="add" @click="createNewProject">Project</VaButton>
      </div>

      <ProjectCards
        v-if="doShowAsCards"
        :projects="projects"
        :loading="isLoading"
        @edit="editProject"
        @delete="onProjectDeleted"
      />
      <ProjectTable
        v-else
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        v-model:pagination="pagination"
        :projects="projects"
        :loading="isLoading"
        @edit="editProject"
        @delete="onProjectDeleted"
      />
    </VaCardContent>

    <VaModal
      v-slot="{ cancel, ok }"
      v-model="doShowProjectFormModal"
      size="small"
      mobile-fullscreen
      close-button
      stateful
      hide-default-actions
      :before-cancel="beforeEditFormModalClose"
    >
      <h1 v-if="projectToEdit === null" class="mb-4 va-h5">新建项目</h1>
      <h1 v-else class="mb-4 va-h5">编辑项目</h1>
      <EditProjectForm
        ref="editFormRef"
        :project="projectToEdit"
        :save-button-label="projectToEdit === null ? '添加' : '保存'"
        @close="cancel"
        @save="
          (project) => {
            onProjectSaved(project)
            ok()
          }
        "
      />
    </VaModal>
  </VaCard>
</template>
