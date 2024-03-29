<script setup lang="ts">
import { ref } from 'vue'
import OtherDataTable from './widgets/OtherDataTable.vue'
import { OtherData } from './types'
import { useOtherData } from './composables/useOtherData'
import { useModal, useToast } from 'vuestic-ui'
import EditOtherDataForm from './widgets/EditOtherDataForm.vue'

const { otherData, isLoading, filters, sorting, pagination, ...usersApi } = useOtherData()
const doShowEditUserModal = ref(false)

const dataToEdit = ref<OtherData | null>(null)

const showApplyModal = (data: OtherData) => {
  dataToEdit.value = data
  doShowEditUserModal.value = true
}
const { init: notify } = useToast()

const onUserApply = async (data: OtherData) => {
  await usersApi.apply(data)
  notify({
    message: `已经发送样本“${data.name}”的申请`,
    color: 'success',
  })
}

// const onUserSaved = async (data: OtherData) => {
//   {
//     usersApi.agree(data)
//     notify({
//       message: `已同意 “${data.name} ”的申请`,
//       color: 'success',
//     })
//   }
// }
const editFormRef = ref()

const { confirm } = useModal()
const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: '有未保存的更改，确认关闭吗？',
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
        @applyData="showApplyModal"
      />
    </VaCardContent>
  </VaCard>
  <VaModal
    v-slot="{ cancel, ok }"
    v-model="doShowEditUserModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
    :before-cancel="beforeEditFormModalClose"
  >
    <h1 class="va-h5">{{ dataToEdit ? '编辑样本' : '添加样本' }}</h1>
    <EditOtherDataForm
      ref="editFormRef"
      :data="dataToEdit"
      :save-button-label="dataToEdit ? '保存' : '添加'"
      @close="cancel"
      @save="
        (data) => {
          onUserApply(data)
          ok()
        }
      "
    />
  </VaModal>
</template>
./composables/useOtherData
