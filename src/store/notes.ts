import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { note } from '@/types/note'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<note[]>([])

  const getNotesFromLocalStorage = () => {
    chrome.storage.local.get('data', (value) => {
      notes.value = value.data
    })
  }

  return { notes, getNotesFromLocalStorage }
})
