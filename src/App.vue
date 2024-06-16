<script setup lang="ts">
import PopUp from './components/PopUp.vue'
import { onMounted } from 'vue'
import { useNotesStore } from './store/notes'
import { storeToRefs } from 'pinia'

const notesStore = useNotesStore()

const { notes } = storeToRefs(notesStore)

onMounted(() => notesStore.getNotesFromSyncStorage())
</script>

<template>
  <v-btn @click="notesStore.editNoteOnContentScript(notes[0])">click!</v-btn>
  <PopUp />
</template>
