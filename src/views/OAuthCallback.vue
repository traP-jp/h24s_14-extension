<template>
  OAuth Pageだよ!
  <div>
    {{ errorText1 }}
  </div>
  <div>
    {{ errorText2 }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const errorText1 = ref<string>('')
const errorText2 = ref<string>('')

onMounted(async () => {
  const code = route.query.code
  const state = route.query.state
  if (typeof code !== 'string') {
    errorText1.value = '正しくないクエリ'
    return
  }
  const res = await fetch(`/api/gettoken?code=${code}&state=${state}`)
  if (res.ok) {
    router.push('/')
  } else {
    errorText2.value = 'access_tokenの取得は失敗した'
  }
})
</script>
