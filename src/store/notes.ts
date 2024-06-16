import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { note } from '@/types/note'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<note[]>([])

  const getNotesFromSyncStorage = () => {
    chrome.storage.sync.get('data', (value) => {
      notes.value = value.data
    })
  }

  return { notes, getNotesFromSyncStorage }
})
