import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { note } from '@/types/note'
import type { message } from '@/types/message'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<note[]>([])

  const getNotesFromSyncStorage = () => {
    chrome.storage.sync.get('data', (value) => {
      notes.value = value.data
    })
  }

  const editNoteOnContentScript = (content: note) => {
    const message: message = {
      method: 'edit',
      content: content
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      chrome.tabs.sendMessage(tab[0].id, message)
    })
  }

  const DeleteNoteOnContentScript = (content: note) => {
    const message: message = {
      method: 'delete',
      content: content
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      chrome.tabs.sendMessage(tab[0].id, message)
    })
  }

  return { notes, getNotesFromSyncStorage, editNoteOnContentScript, DeleteNoteOnContentScript }
})
