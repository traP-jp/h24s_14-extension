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
const backgroundColor = computed(() => (note.value.color ? note.value.color : 'success'))
</script>

<template>
  <v-card :color="backgroundColor" class="mx-4 my-2">
    <v-card-item>
      <v-card-title>{{ note.text }}</v-card-title>
      <v-card-subtitle>
        <div>{{ note.id.username }} {{ note.id.channelName }}</div>
        <div>{{ note.id.messageText }}</div>
      </v-card-subtitle>
      <template #append>
        <v-btn :color="backgroundColor" icon="mdi-delete" flat @click="deleteNote(note.id)"></v-btn>
      </template>
    </v-card-item>
  </v-card>
</template>

<style></style>
