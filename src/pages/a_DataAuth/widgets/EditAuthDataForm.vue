<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'
import { AuthData } from '../types'
// import UserAvatar from './UserAvatar.vue'
import { validators } from '../../../services/utils'

const props = defineProps({
  data: {
    type: Object as PropType<AuthData | null>,
    default: null,
  },
  saveButtonLabel: {
    type: String,
    default: '保存',
  },
})

const defaultNewData: AuthData = {
  id: -1,

  name: '',
  getter: -1,
  number: 0,
  description: '',

  usage: '',
  deadline: new Date(),

  status: '',
}

const newData = ref<AuthData>({ ...defaultNewData })

const validationRules = [
  (val) => {
    if (!val) {
      return true
    }
    return val.getDate?.() >= new Date().getDate?.() || '截止日期不能早于今天'
  },
]

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newData.value).some((key) => {
    // if (key === 'avatar' || key === 'projects') {
    //   return false
    // }

    return newData.value[key as keyof AuthData] !== (props.data ?? defaultNewData)?.[key as keyof AuthData]
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
  () => props.data,
  () => {
    if (!props.data) {
      return
    }

    newData.value = {
      ...props.data,
      // avatar: props.data.avatar || ''
    }
  },
  { immediate: true },
)

const form = useForm('agree-data-form')

const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    console.log(newData.value)
    emit('save', newData.value)
  }
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="agree-data-form" class="inline-flex flex-col items-start justify-start w-full gap-4">
    <div class="flex flex-col items-start self-stretch justify-start gap-4">
      <VaTextarea v-model="newData.usage" :rules="[validators.required]" label="用途" class="w-full" name="usage" />
      <VaDateInput
        v-model="newData.deadline"
        label="截止日期"
        :rules="[validators.required, validationRules]"
        clearable
      />
      <div class="flex flex-col-reverse items-stretch justify-end w-full gap-2 sm:flex-row sm:items-center">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">取消</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">{{ saveButtonLabel }}</VaButton>
      </div>
    </div>
  </VaForm>
</template>
