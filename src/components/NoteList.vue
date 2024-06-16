<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useNotesStore } from '@/store/notes'
import NoteItem from './NoteItem.vue'
import type { note } from '@/types/note'

const currentPage = ref(1)
const noteLintLength = 5
const { notes } = storeToRefs(useNotesStore())
const paginationLength = computed(() => Math.ceil(notes.value.length / noteLintLength))

const paginatedNotes = computed(() => {
  const start = (currentPage.value - 1) * noteLintLength
  const end = start + noteLintLength
  return notes.value.slice(start, end)
})

const generateNote = (index: number): note => {
  const timestamp = new Date(2024, 5, 15 + Math.floor(index / 24), index % 24).toISOString()
  return {
    id: {
      username: `user${index + 1}`,
      time: timestamp,
      messageText: `MessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage ${index + 1}`,
      channelName: `#channel${(index % 10) + 1}`
    },
    text: `NoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNoteNote ${index + 1}.`,
    color: ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', null][index % 8],
    creationTimestamp: timestamp
  }
}

notes.value = Array.from({ length: 100 }, (_, index) => generateNote(index))
</script>

<template>
  <div v-if="notes.length > 0">
    <v-list color="success">
      <div v-for="note in paginatedNotes" :key="JSON.stringify(note.id)">
        <NoteItem :note="note" />
      </div>
    </v-list>
    <v-pagination v-model="currentPage" :length="paginationLength"></v-pagination>
  </div>
  <v-alert v-else>付箋がありません</v-alert>
</template>

<style scoped></style>
