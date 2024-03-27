<script setup lang="ts">
import { ref } from 'vue'
import OtherDataTable from './widgets/OtherDataTable.vue'
import { OtherData } from './types'
import { useOtherData } from './composables/useOtherData'
import { useToast } from 'vuestic-ui'

const { otherData, isLoading, filters, sorting, pagination, ...usersApi } = useOtherData()

const { init: notify } = useToast()

const onUserApply = async (data: OtherData) => {
  await usersApi.apply(data)
  notify({
    message: `已经发送样本“${data.name}”的申请`,
    color: 'success',
  })
}
</script>

<template>
  <!-- <h1 class="page-title">OtherData</h1> -->

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col justify-between gap-2 mb-2 md:flex-row">
        <!-- <div class="flex flex-col justify-start gap-2 md:flex-row"> -->
        <VaButtonToggle
          v-model="filters.otherStatus"
          color="background-element"
          border-color="background-element"
          :options="[
            { label: '全部', value: '' },
            { label: '已获得', value: 'got' },
            { label: '等待中', value: 'waiting' },
            { label: '未申请', value: 'null' },
          ]"
        />
        <VaInput v-model="filters.search" style="max-width: 300px; background-color: #f4f6f8" placeholder="Search">
          <template #prependInner>
            <VaIcon name="search" color="secondary" size="small" />
          </template>
        </VaInput>
      </div>

      <OtherDataTable
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        :data="otherData"
        :loading="isLoading"
        :pagination="pagination"
        @applyData="onUserApply"
      />
    </VaCardContent>
  </VaCard>
</template>
./composables/useOtherData
