<script setup lang="ts">
import { fa_ir } from '@nuxt/ui/locale'
import type { Messages, Direction } from '@nuxt/ui'

const locale = defineLocale<Messages>({ ...fa_ir, dir: 'rtl' as Direction })
</script>
<template>
  <UApp :locale="locale">
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
