import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { note } from '@/types/note'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<note[]>()

  return { notes }
})
