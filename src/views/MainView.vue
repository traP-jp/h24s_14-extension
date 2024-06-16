<script setup lang="ts">
import PopUp from '../components/PopUp.vue'
import { storeToRefs } from 'pinia'
import { useTestStore } from '../store/testStore'
import { useRouter } from 'vue-router'

const testStore = useTestStore()
const { text } = storeToRefs(testStore)
const router = useRouter()

const onBtnClicked = () => {
  router.push('/index.html/oauthcallback')
}
</script>

<template>
  This is Main View.
  <h1>{{ text }}</h1>
  <btn :onclick="onBtnClicked">click!</btn>
  <PopUp />
</template>
