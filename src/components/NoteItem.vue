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
  <v-card :color="note.color ? note.color : 'white'">
    <v-card-item>
      <v-card-title>{{ note.text }}</v-card-title>
      <v-card-subtitle>{{ note.id.username }} {{ note.id.channelName }}</v-card-subtitle>
      <v-card-text>{{ note.id.messageText }}</v-card-text>
      <template #append>
        <v-btn icon="mdi-delete" flat @click="deleteNote(note.id)"></v-btn>
      </template>
    </v-card-item>
  </v-card>
</template>

<style></style>
