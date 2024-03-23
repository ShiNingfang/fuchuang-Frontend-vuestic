<script setup lang="ts">
import { PropType, computed } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { Project } from '../types'
import UserAvatar from '../../users/widgets/UserAvatar.vue'
// import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'
import { Pagination, Sorting } from '../../../data/pages/projects'
import { useVModel } from '@vueuse/core'

const columns = defineVaDataTableColumns([
  { label: '项目名称', key: 'project_name', sortable: true },
  { label: '创建者', key: 'project_owner', sortable: false },
  { label: '合作方', key: 'team', sortable: false },
  { label: '描述', key: 'description', sortable: false },
  { label: '创建时间', key: 'creation_date', sortable: true },
  { label: ' ', key: 'actions' },
  // 在实际应用中，label 使得表格易于理解，而 key 确保了数据正确地映射到表格的相应列中。
  // 这种设计允许组件知道如何从提供的数据项中提取数据并在表格的正确位置显示它们。
])

const props = defineProps({
  projects: {
    type: Array as PropType<Project[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  sortBy: {
    type: Object as PropType<Sorting['sortBy']>,
    required: true,
  },
  sortingOrder: {
    type: Object as PropType<Sorting['sortingOrder']>,
    required: true,
  },
  pagination: {
    type: Object as PropType<Pagination>,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'edit', project: Project): void
  (event: 'delete', project: Project): void
}>()

const avatarColor = (userName: string) => {
  const colors = ['primary', '#FFD43A', '#ADFF00', '#262824', 'danger']
  const index = userName.charCodeAt(0) % colors.length
  return colors[index]
}

const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))
</script>

<template>
  <div>
    <VaDataTable
      v-model:sort-by="sortByVModel"
      v-model:sorting-order="sortingOrderVModel"
      :items="projects"
      :columns="columns"
      :loading="loading"
    >
      <!-- <template #cell(project_name)="{ rowData }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ rowData.project_name }}
        </div>
      </template> -->
      <template #cell(project_owner)="{ rowData }">
        <div class="flex items-center gap-2 ellipsis max-w-[230px]">
          <UserAvatar :user="rowData.project_owner" size="small" />
          {{ rowData.project_owner.fullname }}
        </div>
      </template>
      <template #cell(team)="{ rowData: project }">
        <VaAvatarGroup
          size="small"
          :options="
            (project as Project).team.map((user) => ({
              label: user.fullname,
              src: user.avatar,
              fallbackText: user.fullname[0],
              color: avatarColor(user.fullname),
            }))
          "
          :max="5"
        />
      </template>
      <!-- <template #cell(status)="{ rowData: project }">
        <ProjectStatusBadge :status="project.status" />
      </template> -->

      <template #cell(actions)="{ rowData: project }">
        <div class="flex justify-end gap-2">
          <VaButton
            preset="primary"
            size="small"
            color="primary"
            icon="mso-edit"
            aria-label="Edit project"
            @click="$emit('edit', project as Project)"
          />
          <VaButton
            preset="primary"
            size="small"
            icon="mso-delete"
            color="danger"
            aria-label="Delete project"
            @click="$emit('delete', project as Project)"
          />
        </div>
      </template>
    </VaDataTable>
    <div class="flex flex-col-reverse items-center justify-between gap-2 py-2 md:flex-row">
      <div>
        <b>{{ $props.pagination.total }} results.</b>
        Results per page
        <VaSelect v-model="$props.pagination.perPage" class="!w-20" :options="[10, 50, 100]" />
      </div>

      <div v-if="totalPages > 1" class="flex">
        <VaButton
          preset="secondary"
          icon="va-arrow-left"
          aria-label="Previous page"
          :disabled="$props.pagination.page === 1"
          @click="$props.pagination.page--"
        />
        <VaButton
          class="mr-2"
          preset="secondary"
          icon="va-arrow-right"
          aria-label="Next page"
          :disabled="$props.pagination.page === totalPages"
          @click="$props.pagination.page++"
        />
        <VaPagination
          v-model="$props.pagination.page"
          buttons-preset="secondary"
          :pages="totalPages"
          :visible-pages="5"
          :boundary-links="false"
          :direction-links="false"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
