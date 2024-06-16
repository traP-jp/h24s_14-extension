<script setup lang="ts">
import { ref } from 'vue'
import PopUp from './components/PopUp.vue'

const onBtnClicked = async () => {
  const val = await chrome.storage.local.get('data')
  text.value = val.data
}
const text = ref<string>('Hello!')
</script>

<template>
  <h1>{{ text }}</h1>
  <btn :onclick="onBtnClicked">click!</btn>
  <PopUp />
</script>
