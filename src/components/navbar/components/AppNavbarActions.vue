<template>
  <div class="app-navbar-actions">
    <GithubButton v-if="!isMobile" class="app-navbar-actions__item" />
    <VaButton
      v-if="!isMobile"
      preset="secondary"
      href="https://admin.vuestic.dev/"
      target="_blank"
      color="textPrimary"
      class="flex-shrink-0 mx-0 app-navbar-actions__item"
    >
      {{ t('aboutVuesticAdmin') }}
    </VaButton>
    <VaButton
      v-if="!isMobile"
      preset="secondary"
      href="https://discord.gg/u7fQdqQt8c"
      target="_blank"
      color="textPrimary"
      class="flex-shrink-0 mx-0 app-navbar-actions__item"
    >
      {{ t('helpAndSupport') }}
    </VaButton>
    <NotificationDropdown class="app-navbar-actions__item" />
    <ProfileDropdown class="mr-1 app-navbar-actions__item app-navbar-actions__item--profile" />
  </div>
</template>

<script lang="ts" setup>
import ProfileDropdown from './dropdowns/ProfileDropdown.vue'
import NotificationDropdown from './dropdowns/NotificationDropdown.vue'
import GithubButton from './GitHubButton.vue'

defineProps({
  isMobile: { type: Boolean, default: false },
})

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style lang="scss">
.app-navbar-actions {
  display: flex;
  align-items: center;

  .va-dropdown__anchor {
    color: var(--va-primary);
    fill: var(--va-primary);
  }

  &__item {
    padding: 0;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    svg {
      height: 20px;
    }

    &--profile {
      display: flex;
      justify-content: center;
    }

    .va-dropdown-content {
      background-color: var(--va-white);
    }

    @media screen and (max-width: 640px) {
      margin-left: 0;
      margin-right: 0;

      &:first-of-type {
        margin-left: 0;
      }
    }
  }

  .fa-github {
    color: var(--va-on-background-primary);
  }
}
</style>
