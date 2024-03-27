<script setup lang="ts">
import { PropType } from 'vue'
import { Project } from '../types'
import ProjectStatusBadge from '../components/ProjectStatusBadge.vue'

defineProps({
  projects: {
    type: Array as PropType<Project[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})

defineEmits<{
  (event: 'edit', project: Project): void
  (event: 'delete', project: Project): void
}>()

const avatarColor = (userName: string) => {
  const colors = ['primary', '#FFD43A', '#ADFF00', '#262824', 'danger']
  const index = userName.charCodeAt(0) % colors.length
  return colors[index]
}
</script>

<template>
  <VaInnerLoading
    v-if="projects.length > 0 || loading"
    :loading="loading"
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 min-h-[4rem]"
  >
    <VaCard
      v-for="project in projects"
      :key="project.project_name"
      :style="{ '--va-card-outlined-border': '1px solid var(--va-background-element)' }"
      outlined
    >
      <VaCardContent class="flex flex-col h-full">
        <div class="text-[var(--va-secondary)]">{{ project.creation_date }}</div>
        <div class="flex flex-col items-center gap-4 grow">
          <h4 class="self-stretch overflow-hidden text-center va-h4 line-clamp-2 text-ellipsis">
            {{ project.project_name }}
          </h4>
          <p>
            <span class="text-[var(--va-secondary)]">Owner: </span>
            <span>{{ project.project_owner.name }}</span>
          </p>
          <VaAvatarGroup
            class="my-4"
            :options="
              project.team.map((user) => ({
                label: user.name,
                src: user.photo,
                fallbackText: user.name[0],
                color: avatarColor(user.name),
              }))
            "
            :max="5"
          />
          <!-- <ProjectStatusBadge :status="project.status" /> -->
        </div>
      </VaCardContent>
    </VaCard>
  </VaInnerLoading>
  <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">No projects</div>
</template>
