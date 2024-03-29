<script setup lang="ts">
import { defineVaDataTableColumns, useModal } from 'vuestic-ui'
import { OtherData } from '../types'
import { PropType, computed, toRef } from 'vue'
import { Pagination, Sorting } from '../../../data/pages/minedata'
import { useVModel } from '@vueuse/core'

const columns = defineVaDataTableColumns([
  { label: '样本名称', key: 'name', sortable: true },
  { label: '来源', key: 'owner.name', sortable: false },
  { label: '图片数量', key: 'number', sortable: true },
  { label: '描述', key: 'description', sortable: false },
  { label: '状态', key: 'status', sortable: false },
  { label: ' ', key: 'actions', align: 'right' },
])

const props = defineProps({
  data: {
    type: Array as PropType<OtherData[]>,
    required: true,
  },
  loading: { type: Boolean, default: false },
  pagination: { type: Object as PropType<Pagination>, required: true },
  sortBy: { type: String as PropType<Sorting['sortBy']>, required: true },
  sortingOrder: { type: String as PropType<Sorting['sortingOrder']>, required: true },
})

const emit = defineEmits<{
  (event: 'apply-data', data: OtherData): void
  (event: 'update:sortBy', sortBy: Sorting['sortBy']): void
  (event: 'update:sortingOrder', sortingOrder: Sorting['sortingOrder']): void
}>()

const data = toRef(props, 'data')
const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

// const roleColors: Record<OtherStatus, string> = {
//   admin: 'danger',
//   data: 'background-element',
//   owner: 'warning',
// }

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))

const { confirm } = useModal()

const onApplyData = async (data: OtherData) => {
  const agreed = await confirm({
    title: '发送申请',
    message: `你确定要申请样本“${data.name}”的使用权吗?`,
    okText: '申请',
    cancelText: '取消',
    size: 'small',
    maxWidth: '380px',
  })

  if (agreed) {
    emit('apply-data', data)
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
          v-if="rowData.status === 'disavailable'"
          preset="primary"
          size="small"
          icon="mso-edit"
          aria-label="申请使用"
          @click="$emit('apply-data', rowData as OtherData)"
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
