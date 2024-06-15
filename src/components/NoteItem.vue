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

const editNote = () => {
  // test
}

</script>

<template>
  <v-list-item-content>
    <v-list-item-title>{{ note.text }}</v-list-item-title>
    <v-list-item-subtitle>{{ note.color }}</v-list-item-subtitle>
    <v-row class="mt-3" align="center" justify="start">
      <v-btn size="small" variant="outlined" class="mr-2" @click="deleteNote(note.id)">削除</v-btn>
      <v-btn size="small" variant="outlined" @click="editNote">編集</v-btn>
    </v-row>
  </v-list-item-content>
</template>

<style scoped>
.mt-3 {
  margin-top: 16px;
}
.mr-2 {
  margin-right: 8px; 
}
</style>