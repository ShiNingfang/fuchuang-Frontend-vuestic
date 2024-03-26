<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'
import { MineData } from '../types'
// import UserAvatar from './UserAvatar.vue'
import { validators } from '../../../services/utils'

const props = defineProps({
  data: {
    type: Object as PropType<MineData | null>,
    default: null,
  },
  saveButtonLabel: {
    type: String,
    default: '保存',
  },
})

const file = ref([])
const defaultNewData: MineData = {
  id: -1,
  owner: -1,
  path: '',

  name: '',
  number: 0,
  description: '',
  status: '',
  upload_time: new Date(),
  auth_number: 0,
}

const newData = ref<MineData>({ ...defaultNewData })

const validateInteger = (value) => {
  const parsedValue = parseInt(value, 10) // 尝试将输入值转换为整数
  if (!isNaN(parsedValue) && parsedValue >= 0) {
    // 检查转换后的值是否为数字且大于等于0
    return true
  }
  return '请输入一个非负整数'
}

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newData.value).some((key) => {
    // if (key === 'avatar' || key === 'projects') {
    //   return false
    // }

    return newData.value[key as keyof MineData] !== (props.data ?? defaultNewData)?.[key as keyof MineData]
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

const form = useForm('add-data-form')

const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    console.log(newData.value)
    emit('save', newData.value)
  }
}
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-data-form" class="inline-flex flex-col items-start justify-start w-full gap-4">
    <div class="flex flex-col items-start self-stretch justify-start gap-4">
      <div class="flex flex-col w-full gap-4 sm:flex-row">
        <VaInput
          v-model="newData.name"
          label="样本名称"
          class="w-full sm:w-1/2"
          :rules="[validators.required]"
          name="name"
        />
        <VaCounter
          v-model="newData.number"
          label="图片数量"
          class="w-full sm:w-1/2"
          :rules="[validators.required, validateInteger]"
          name="number"
          manual-input
          :min="0"
        />
      </div>
      <VaInput v-model="newData.path" placeholder="点击输入框选择样本地址" label="上传样本" type="file" />
      <VaTextarea v-model="newData.description" label="描述" class="w-full" name="description" />
      <div class="flex flex-col-reverse items-stretch justify-end w-full gap-2 sm:flex-row sm:items-center">
        <VaButton preset="secondary" color="secondary" @click="$emit('close')">取消</VaButton>
        <VaButton :disabled="!isValid" @click="onSave">{{ saveButtonLabel }}</VaButton>
      </div>
    </div>
  </VaForm>
</template>
