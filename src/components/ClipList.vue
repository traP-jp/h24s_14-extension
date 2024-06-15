<script setup lang="ts">
import ClipItem from './ClipItem.vue'
import { ref } from 'vue'

const currentPage = ref(1)
const paginationLength = 4
const clipLintLength = 10
</script>

<template>
  <v-list>
    <clip-item v-for="i in clipLintLength" :key="i" />
  </v-list>
  <v-pagination v-model="currentPage" :length="paginationLength"></v-pagination>
</template>

<style></style>
