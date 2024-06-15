<script setup lang="ts">
import type { note as Note, noteId } from '@/types/note'
import { storeToRefs } from 'pinia'
import { useNotesStore } from '@/store/notes'
import { computed, type Ref } from 'vue'

const props = defineProps({
  note: {
    type: Object as () => Note,
    required: true
  }
})
const note: Ref<Note> = computed(() => ({ ...props.note }))

const { notes } = storeToRefs(useNotesStore())

const deleteNote = (id: noteId) => {
  notes.value = notes.value.filter((note) => note.id !== id)
}
</script>

<template>
  <v-list-item>
    <v-list-item-title>{{ note.text }}</v-list-item-title>
    <v-list-item-subtitle>{{ note.color }}</v-list-item-subtitle>
    <v-btn variant="tonal" color="primary" @click="deleteNote(note.id)">削除</v-btn>
  </v-list-item>
</template>

<style></style>
