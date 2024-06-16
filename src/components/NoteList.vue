<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useNotesStore } from '@/store/notes'
import NoteItem from './NoteItem.vue'

const currentPage = ref(1)
const noteLintLength = 5
const { notes } = storeToRefs(useNotesStore())
const paginationLength = computed(() => Math.ceil(notes.value.length / noteLintLength))

const paginatedNotes = computed(() => {
  const start = (currentPage.value - 1) * noteLintLength
  const end = start + noteLintLength
  return notes.value.slice(start, end)
})
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
