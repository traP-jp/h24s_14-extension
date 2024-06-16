<script setup lang="ts">
import { usePreferredColorScheme } from '@vueuse/core'
import NoteList from './NoteList.vue'

const theme = usePreferredColorScheme()
</script>

<template>
  <v-theme-provider :theme="theme" with-background>
    <NoteList />
  </v-theme-provider>
</template>

<style></style>
