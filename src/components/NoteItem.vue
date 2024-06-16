<script setup lang="ts">
import type { note as Note, noteId } from '@/types/note'
import { storeToRefs } from 'pinia'
import { useNotesStore } from '@/store/notes'
import { reactive, computed, type Ref } from 'vue'

const props = defineProps({
  note: {
    type: Object as () => Note,
    required: true
  }
})

const note: Ref<Note> = computed(() => ({ ...props.note }))
const { notes } = storeToRefs(useNotesStore())

const state = reactive({
  confirmDelete: false
})

const deleteNote = (id: noteId) => {
  notes.value = notes.value.filter((note) => note.id !== id)
}

const editNote = (id: noteId) => {
  const text = prompt('Enter note text:', note.value.text || '')
  if (text) {
    const updatedNotes = notes.value.map(n => {
      if (n.id === id) {
        return {
          ...n,
          text
        }
      }
      return n
    })
    notes.value = updatedNotes
  }
}
</script>

<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ note.text }}</v-list-item-title>
      <v-list-item-subtitle>
        <v-scroll-y-reverse-transition mode="out-in">
          <div v-if="state.confirmDelete" class="text-success text-caption">
            本当に削除しますか?
          </div>
          <div v-else class="text-caption">
            {{ note.creationTimestamp || 'Timestamp not available' }}
          </div>
        </v-scroll-y-reverse-transition>
      </v-list-item-subtitle>
    </v-list-item-content>
    <template v-slot:append>
      <v-fade-transition mode="out-in">
        <v-row class="mt-3" justify="start" v-if="state.confirmDelete">
          <v-btn size="small" variant="outlined" class="mr-2" @click="deleteNote(note.id)">Yes</v-btn>
          <v-btn size="small" variant="outlined" @click="state.confirmDelete = false">No</v-btn>
        </v-row>
      </v-fade-transition>
      <v-fade-transition mode="out-in">
        <v-row class="mt-3" justify="start" v-if="!state.confirmDelete">
          <v-btn size="small" variant="outlined" class="mr-2" @click="state.confirmDelete = true">delete</v-btn>
          <v-btn size="small" variant="outlined" @click="editNote(note.id)">edit</v-btn>
        </v-row>
      </v-fade-transition>
    </template>
  </v-list-item>
</template>
