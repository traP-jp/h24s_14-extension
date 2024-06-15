<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useNotesStore } from '@/store/notes'
import type { noteId } from '@/types/note.d'

const currentPage = ref(1)
const paginationLength = 4
const noteLintLength = 5
const { notes } = storeToRefs(useNotesStore())

const paginatedNotes = computed(() => {
  const start = (currentPage.value - 1) * noteLintLength
  const end = start + noteLintLength
  return notes.value.slice(start, end)
})
const deleteNote = (id: noteId) => {
  notes.value = notes.value.filter((note) => note.id !== id)
}
</script>

<template>
  <v-list>
    <v-list-item v-for="note in paginatedNotes" :key="JSON.stringify(note.id)">
      <v-list-item-content>
        <v-list-item-title>{{ note.text }}</v-list-item-title>
        <v-list-item-subtitle>{{ note.color }}</v-list-item-subtitle>
        <v-btn variant="tonal" color="primary" @click="deleteNote(note.id)">削除</v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-list>
  <v-pagination v-model="currentPage" :length="paginationLength"></v-pagination>
</template>

<style scoped></style>
