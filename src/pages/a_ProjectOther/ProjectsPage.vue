<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useProjects } from './composables/useProjects'
import ProjectCards from './widgets/ProjectCards.vue'
import ProjectTable from './widgets/ProjectsTable.vue'
import { Project } from './types'
import { useModal, useToast } from 'vuestic-ui'

const doShowAsCards = useLocalStorage('projects-view', true)

const { projects, isLoading, pagination, sorting } = useProjects()
// 项目列表，更新，添加，是否转圈，删除，分页指示，排序数据（依据，list）
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
        <!-- <VaButton icon="add" @click="createNewProject">Project</VaButton> -->
      </div>

      <ProjectCards v-if="doShowAsCards" :projects="projects" :loading="isLoading" />
      <ProjectTable
        v-else
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        v-model:pagination="pagination"
        :projects="projects"
        :loading="isLoading"
      />
    </VaCardContent>
  </VaCard>
</template>
