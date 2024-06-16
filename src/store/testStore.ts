import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestStore = defineStore('test', () => {
  const text = ref<string>('Hello')

  const getTextFromLocalStorage = () => {
    chrome.storage.sync.get('data', (value) => {
      text.value = value.data
    })
  }

  return { text, getTextFromLocalStorage }
})
