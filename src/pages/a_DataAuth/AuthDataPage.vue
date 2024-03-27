<script setup lang="ts">
import { ref } from 'vue'
import AuthDataTable from './widgets/AuthDataTable.vue'
import EditAuthDataForm from './widgets/EditAuthDataForm.vue'
import { AuthData } from './types'
import { useAuthData } from './composables/useAuthData'
import { useModal, useToast } from 'vuestic-ui'

const doShowEditUserModal = ref(false)

const { authData, isLoading, filters, sorting, pagination, ...usersApi } = useAuthData()

const dataToEdit = ref<AuthData | null>(null)

const showAgreeModal = (data: AuthData) => {
  dataToEdit.value = data
  doShowEditUserModal.value = true
}

const { init: notify } = useToast()

const onUserSaved = async (data: AuthData) => {
  {
    usersApi.agree(data)
    notify({
      message: `已同意 “${data.name} ”的申请`,
      color: 'success',
    })
  }
}

const onReject = async (data: AuthData) => {
  await usersApi.remove(data)
  notify({
    message: `已拒绝 “${data.name} ”的申请`,
    color: 'success',
  })
}

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
  <!-- <h1 class="page-title">AuthData</h1> -->

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col justify-between gap-2 mb-2 md:flex-row">
        <!-- <div class="flex flex-col justify-start gap-2 md:flex-row"> -->
        <VaButtonToggle
          v-model="filters.authStatus"
          color="background-element"
          border-color="background-element"
          :options="[
            { label: '全部', value: '' },
            { label: '未处理', value: 'waiting' },
            { label: '已同意', value: 'agree' },
            { label: '已拒绝', value: 'no' },
          ]"
        />
        <VaInput v-model="filters.search" style="max-width: 300px; background-color: #f4f6f8" placeholder="Search">
          <template #prependInner>
            <VaIcon name="search" color="secondary" size="small" />
          </template>
        </VaInput>
      </div>

      <AuthDataTable
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        :data="authData"
        :data-type="filters.authStatus"
        :loading="isLoading"
        :pagination="pagination"
        @agreeData="showAgreeModal"
        @rejectData="onReject"
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
    <EditAuthDataForm
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
./composables/useAuthData
