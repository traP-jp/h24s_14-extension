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
    chrome.tabs.query({ currentWindow: true, active: true }).then(
      (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id as number, message)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  const DeleteNoteOnContentScript = (content: note) => {
    const message: message = {
      method: 'delete',
      content: content
    }
    chrome.tabs.query({ currentWindow: true, active: true }).then(
      (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id as number, message)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  return { notes, getNotesFromSyncStorage, editNoteOnContentScript, DeleteNoteOnContentScript }
})
