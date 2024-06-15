<script setup lang="ts">
import { ref, computed } from 'vue'
import type { note } from './clip.ts'

const currentPage = ref(1)
const paginationLength = 4
const clipLintLength = 5
const clips = ref<note[]>([
  { id: 1, text: 'clip 1', timestamp: '2021-10-01' },
  { id: 2, text: 'clip 2', timestamp: '2021-10-02' },
  { id: 3, text: 'clip 3', timestamp: '2021-10-03' },
  { id: 4, text: 'clip 4', timestamp: '2021-10-04' },
  { id: 5, text: 'clip 5', timestamp: '2021-10-05' },
  { id: 6, text: 'clip 6', timestamp: '2021-10-06' },
  { id: 7, text: 'clip 7', timestamp: '2021-10-07' },
  { id: 8, text: 'clip 8', timestamp: '2021-10-08' },
  { id: 9, text: 'clip 9', timestamp: '2021-10-09' },
  { id: 10, text: 'clip 10', timestamp: '2021-10-10' },
  { id: 11, text: 'clip 11', timestamp: '2021-10-11' },
  { id: 12, text: 'clip 12', timestamp: '2021-10-12' },
  { id: 13, text: 'clip 13', timestamp: '2021-10-13' },
  { id: 14, text: 'clip 14', timestamp: '2021-10-14' },
  { id: 15, text: 'clip 15', timestamp: '2021-10-15' },
  { id: 16, text: 'clip 16', timestamp: '2021-10-16' },
  { id: 17, text: 'clip 17', timestamp: '2021-10-17' },
  { id: 18, text: 'clip 18', timestamp: '2021-10-18' },
  { id: 19, text: 'clip 19', timestamp: '2021-10-19' },
  { id: 20, text: 'clip 20', timestamp: '2021-10-20' }
])

const paginatedClips = computed(() => {
  const start = (currentPage.value - 1) * clipLintLength
  const end = start + clipLintLength
  return clips.value.slice(start, end)
})
const deleteNote = (id: number) => {
  clips.value = clips.value.filter(note => note.id !== id)
}
</script>

<template>
  <v-list>
    <v-list-item v-for="note in paginatedClips" :key="note.id">
      <v-list-item-content>
        <v-list-item-title>{{ note.text }}</v-list-item-title>
        <v-list-item-subtitle>{{ note.timestamp }}</v-list-item-subtitle>
        <v-btn variant = "tonal" color = "primary" @click="deleteNote(note.id)">削除</v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  <v-pagination v-model="currentPage" :length="paginationLength"></v-pagination>
</template>

<style scoped></style>