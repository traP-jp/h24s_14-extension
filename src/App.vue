<script setup lang="ts">
import PopUp from './components/PopUp.vue'
import { onMounted } from 'vue'
import { useNotesStore } from './store/notes'

const notesStore = useNotesStore()

onMounted(() => notesStore.getNotesFromSyncStorage())
</script>

<template>
  <PopUp />
</template>

<style>
#app {
  width: 500px;
}
</style>
