<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { MineData, MineStatus } from '../types'
import { PropType, computed, toRef } from 'vue'
import { Pagination, Sorting } from '../../../data/pages/minedata'
import { useVModel } from '@vueuse/core'

const columns = defineVaDataTableColumns([
  // { label: 'Full Name', key: 'fullname', sortable: true },
  // { label: 'Email', key: 'email', sortable: true },
  // { label: 'Username', key: 'username', sortable: true },
  // { label: 'Role', key: 'role', sortable: true },
  // { label: 'Projects', key: 'projects', sortable: true },
  // { label: ' ', key: 'actions', align: 'right' },

  { label: '样本名称', key: 'name', sortable: true },
  { label: '图片数量', key: 'number', sortable: true },
  { label: '描述', key: 'description', sortable: false },
  { label: '地址', key: 'path', sortable: false },
  { label: '授权数', key: 'auth_number', sortable: true },
  { label: '上传时间', key: 'upload_time', sortable: true },
  { label: '状态', key: 'status', sortable: false },
  { label: ' ', key: 'actions', align: 'right' },
])

const props = defineProps({
  data: {
    type: Array as PropType<MineData[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<Pagination>, required: true },
  sortBy: { type: String as PropType<Sorting['sortBy']>, required: true },
  sortingOrder: { type: String as PropType<Sorting['sortingOrder']>, required: true },
})

const emit = defineEmits<{
  (event: 'edit-data', data: MineData): void
  (event: 'change-status', data: MineData): void
  (event: 'delete-data', data: MineData): void
  (event: 'update:sortBy', sortBy: Sorting['sortBy']): void
  (event: 'update:sortingOrder', sortingOrder: Sorting['sortingOrder']): void
}>()

const data = toRef(props, 'data')
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

// const roleColors: Record<MineStatus, string> = {
//   admin: 'danger',
//   data: 'background-element',
//   owner: 'warning',
// }

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))

const { confirm } = useModal()
const onStatusChange = async (data: MineData) => {
  let agreed = undefined
  if (data.status === 'private') {
    agreed = await confirm({
      title: '公开样本',
      message: `你确定要公开“${data.name}”吗?`,
      okText: '公开',
      cancelText: '取消',
      size: 'small',
      maxWidth: '380px',
    })
  } else if (data.status === 'public') {
    agreed = await confirm({
      title: '隐藏样本',
      message: `你确定要隐藏“${data.name}”吗?`,
      okText: '隐藏',
      cancelText: '取消',
      size: 'small',
      maxWidth: '380px',
    })
  }
  if (agreed) {
    emit('change-status', data)
  }
}
const onUserDelete = async (data: MineData) => {
  const agreed = await confirm({
    title: '删除样本',
    message: `你确定要删除“${data.name}”吗?`,
    okText: '删除',
    cancelText: '取消',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('delete-data', data)
  }
}
</script>

<template>
  <VaDataTable
    v-model:sort-by="sortByVModel"
    v-model:sorting-order="sortingOrderVModel"
    :columns="columns"
    :items="data"
    :loading="$props.loading"
  >
    <template #cell(actions)="{ rowData }">
      <div class="flex justify-end gap-2">
        <VaButton
          v-if="rowData.status === 'public'"
          preset="primary"
          size="small"
          icon="mso-hide_source"
          aria-label="编辑样本"
          @click="onStatusChange(rowData as MineData)"
        />
        <VaButton
          v-if="rowData.status === 'private'"
          preset="primary"
          size="small"
          icon="mso-cloud_upload"
          aria-label="编辑样本"
          @click="onStatusChange(rowData as MineData)"
        />
        <VaButton
          v-if="rowData.status !== 'deleted'"
          preset="primary"
          size="small"
          icon="mso-delete"
          color="danger"
          aria-label="删除样本"
          @click="onUserDelete(rowData as MineData)"
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
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(.va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
