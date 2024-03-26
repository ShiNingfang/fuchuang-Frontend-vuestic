<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { AuthData, AuthStatus } from '../types'
import { PropType, computed, toRef } from 'vue'
import { Pagination, Sorting } from '../../../data/pages/authdata'
import { useVModel } from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
  dataType: {
    type: String as PropType<AuthStatus>,
    required: true,
  },
  data: {
    type: Array as PropType<AuthData[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<Pagination>, required: true },
  sortBy: { type: String as PropType<Sorting['sortBy']>, required: true },
  sortingOrder: { type: String as PropType<Sorting['sortingOrder']>, required: true },
})
const statusText: Record<AuthStatus, string> = {
  '': '',
  no: '已拒绝',
  agree: '已同意',
  waiting: '待审批',
}
const statusColors: Record<AuthStatus, string> = {
  '': '',
  no: 'danger',
  agree: 'green',
  waiting: 'warning',
}
const emit = defineEmits<{
  (event: 'agree-data', data: AuthData): void
  (event: 'reject-data', data: AuthData): void
  (event: 'update:sortBy', sortBy: Sorting['sortBy']): void
  (event: 'update:sortingOrder', sortingOrder: Sorting['sortingOrder']): void
}>()

const dataType = toRef(props, 'dataType')
const data = toRef(props, 'data')
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)
console.log(dataType)

watch(
  () => props.dataType,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
  },
)
const columnsArray = computed(() => {
  if (dataType.value === 'agree' || dataType.value === '') {
    return [
      { label: '样本名称', key: 'name', sortable: true },
      { label: '申请者', key: 'getter', sortable: true },
      { label: '图片数量', key: 'number', sortable: true },
      { label: '描述', key: 'description', sortable: false },
      { label: '用途', key: 'usage', sortable: true },
      { label: '截止时间', key: 'deadline', sortable: true },
      { label: ' ', key: 'actions', align: 'right' },
    ]
  } else {
    return [
      { label: '样本名称', key: 'name', sortable: true },
      { label: '申请者', key: 'getter', sortable: true },
      { label: '图片数量', key: 'number', sortable: true },
      { label: '描述', key: 'description', sortable: false },
      { label: ' ', key: 'actions', align: 'right' },
    ]
  }
})
console.log(columnsArray)
const columns = defineVaDataTableColumns(columnsArray)

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))

const { confirm } = useModal()

const onUserDelete = async (data: AuthData) => {
  const agreed = await confirm({
    title: '删除样本',
    message: `你确定要删除“${data.name}”吗?`,
    okText: '删除',
    cancelText: '取消',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('reject-data', data)
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
      <VaBadge
        v-if="rowData.status !== 'waiting'"
        :text="statusText[rowData.status]"
        :color="statusColors[rowData.status as AuthStatus]"
      />
      <div class="flex justify-end gap-2">
        <VaButton
          v-if="rowData.status === 'waiting'"
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="同意申请"
          @click="$emit('agree-data', rowData as AuthData)"
        />
        <VaButton
          v-if="rowData.status === 'waiting'"
          preset="primary"
          size="small"
          icon="mso-delete"
          color="danger"
          aria-label="拒绝申请"
          @click="onUserDelete(rowData as AuthData)"
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
