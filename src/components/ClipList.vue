<script setup lang="ts">
import { ref, computed } from 'vue'
import type { note } from './clip.ts'

const currentPage = ref(1)
const paginationLength = 4
const clipLintLength = 5
const clips = ref<note[]>([])

const paginatedClips = computed(() => {
  const start = (currentPage.value - 1) * clipLintLength
  const end = start + clipLintLength
  return clips.value.slice(start, end)
})
const deleteNote = (id: string) => {
  clips.value = clips.value.filter((note) => note.id !== id)
}
</script>

<template>
  <v-list>
    <v-list-item v-for="note in paginatedClips" :key="note.id">
      <v-list-item-content>
        <v-list-item-title>{{ note.text }}</v-list-item-title>
        <v-list-item-subtitle>{{ note.timestamp }}</v-list-item-subtitle>
        <v-btn variant="tonal" color="primary" @click="deleteNote(note.id)">削除</v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  <v-pagination v-model="currentPage" :length="paginationLength"></v-pagination>
</template>

<style scoped></style>
