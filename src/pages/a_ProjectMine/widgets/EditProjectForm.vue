<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Project, pjtUser } from '../types'
import { SelectOption } from 'vuestic-ui'
import { useUsers } from '../../users/composables/useUsers'
// import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'
import UserPhoto from './UserPhoto.vue'
import { useUserStore } from '../../../stores/user-store'

const userStore = useUserStore()
const props = defineProps<{
  cooperators: pjtUser | null
  project: Project | null
  saveButtonLabel: string
}>()

defineEmits<{
  (event: 'save', project: Project): void
  (event: 'close'): void
}>()

const defaultNewProject: Project = {
  id: -1,
  project_name: '',
  type: '横向建模',
  team: [],
  description: '',
  create_date: new Date(),

  project_owner: {
    id: userStore.id,
    name: userStore.name,
    photo: userStore.avatar, // 注意，如果avatar是undefined，也会被这样直接复制
  },
  status: undefined,
}

const newProject = ref({ ...defaultNewProject })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newProject.value).some((key) => {
    if (key === 'team') {
      return false
    }

    return newProject.value[key as keyof Project] !== (props.project ?? defaultNewProject)?.[key as keyof Project]
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
  () => props.project,
  () => {
    if (!props.project) {
      return
    }

    newProject.value = {
      ...props.project,
      project_owner: props.project.project_owner,
    }
  },
  { immediate: true },
)

const required = (v: string | SelectOption) => !!v || 'This field is required'

const { users: teamUsers, filters: teamFilters } = useUsers({ pagination: ref({ page: 1, perPage: 100, total: 10 }) })
// const { users: ownerUsers, filters: ownerFilters } = useUsers({ pagination: ref({ page: 1, perPage: 100, total: 10 }) })
</script>

<template>
  <VaForm v-slot="{ validate }" class="flex flex-col gap-2">
    <VaInput v-model="newProject.project_name" label="项目名称" :rules="[required]" />
    <div>
      <span
        class="va-title"
        style="color: #154ec1; font-size: 9px; line-height: 14px; letter-spacing: 0.4px; min-height: 14px"
        >任务类型</span
      >
      <VaOptionList v-model="newProject.type" :options="['横向建模']" :rules="[required]" type="radio" />
    </div>
    <VaSelect
      v-model="newProject.team"
      v-model:search="teamFilters.search"
      label="合作方"
      text-by="name"
      track-by="id"
      multiple
      :rules="[(v: any) => ('length' in v && v.length > 0) || 'This field is required']"
      :options="cooperators"
      :max-visible-options="$vaBreakpoint.mdUp ? 3 : 1"
    >
      <!-- <template #content="{ valueArray }">
        <template v-if="valueArray">
          <div v-for="(cooperator, index) in valueArray" :key="cooperator.id" class="flex items-center gap-1 mr-2">
            <UserPhoto :user="cooperator" size="18px" />
            {{ cooperator.name }}{{ index < valueArray.length - 1 ? ',' : '' }}
          </div>
        </template>
      </template> -->
    </VaSelect>
    <VaTextarea v-model="newProject.description" label="描述" :rules="[required]" />
    <div class="flex flex-col-reverse justify-end gap-2 mt-4 sm:flex-row">
      <VaButton preset="secondary" color="secondary" @click="$emit('close')">取消</VaButton>
      <VaButton @click="validate() && $emit('save', newProject as Project)">{{ saveButtonLabel }}</VaButton>
    </div>
  </VaForm>
</template>

<style lang="scss" scoped>
.va-select-content__autocomplete {
  flex: 1;
}

.va-input-wrapper__text {
  gap: 0.2rem;
}
</style>
