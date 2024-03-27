<script setup lang="ts">
import { ref } from 'vue'
import MineDataTable from './widgets/MineDataTable.vue'
import EditMineDataForm from './widgets/EditMineDataForm.vue'
import { MineData } from './types'
import { useMineData } from './composables/useMineData'
import { useModal, useToast } from 'vuestic-ui'

const doShowEditUserModal = ref(false)

const { mineData, isLoading, filters, sorting, pagination, ...usersApi } = useMineData()

const dataToEdit = ref<MineData | null>(null)

const showEditUserModal = (data: MineData) => {
  dataToEdit.value = data
  dataToEdit.value.path = ''
  doShowEditUserModal.value = true
}

const showAddUserModal = () => {
  dataToEdit.value = null
  doShowEditUserModal.value = true
}

const { init: notify } = useToast()

const onUserSaved = async (data: MineData) => {
  if (dataToEdit.value) {
    await usersApi.changeState(data)
    notify({
      message: `${data.name} 已经更新`,
      color: 'success',
    })
  } else {
    usersApi.add(data)
    notify({
      message: `${data.name} 已经创建`,
      color: 'success',
    })
  }
}

const onUserDelete = async (data: MineData) => {
  await usersApi.remove(data)
  notify({
    message: `${data.name} 已经删除`,
    color: 'success',
  })
}

const editFormRef = ref()

const { confirm } = useModal()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: '有未保存的更改，确认离开？',
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
  <!-- <h1 class="page-title">MineData</h1> -->

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col justify-between gap-2 mb-2 md:flex-row">
        <!-- <div class="flex flex-col justify-start gap-2 md:flex-row"> -->
        <VaButtonToggle
          v-model="filters.mineStatus"
          color="background-element"
          border-color="background-element"
          :options="[
            { label: '全部', value: '' },
            { label: '私有的', value: 'private' },
            { label: '公开的', value: 'public' },
          ]"
        />
        <VaInput v-model="filters.search" style="max-width: 300px; background-color: #f4f6f8" placeholder="Search">
          <template #prependInner>
            <VaIcon name="search" color="secondary" size="small" />
          </template>
        </VaInput>
        <!-- </div> -->
        <VaButton @click="showAddUserModal">添加样本</VaButton>
      </div>

      <MineDataTable
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        :data="mineData"
        :loading="isLoading"
        :pagination="pagination"
        @editData="showEditUserModal"
        @deleteData="onUserDelete"
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
    <EditMineDataForm
      ref="editFormRef"
      :data="dataToEdit"
      :save-button-label="dataToEdit ? '保存' : '添加'"
      @close="cancel"
      @save="
        (data) => {
          onUserSaved(data)
          ok()
        }
      "
    />
  </VaModal>
</template>
