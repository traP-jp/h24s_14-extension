<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTestStore } from './store/testStore'
import PopUp from './components/PopUp.vue'

const testStore = useTestStore()
const { text } = storeToRefs(testStore)

const onBtnClicked = () => {
  testStore.getTextFromLocalStorage()
}
</script>

<template>
  <h1>{{ text }}</h1>
  <btn :onclick="onBtnClicked">click!</btn>
  <PopUp />
</template>
