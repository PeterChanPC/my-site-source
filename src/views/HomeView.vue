<template>
  <div class="home">
    <h1>{{ t('user', { user: username }) }}</h1>
    <h2>{{ d(new Date(), 'short', 'en-US') }}</h2>
    <h2>{{ d(new Date(), 'long') }}</h2>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.store'

const { t, d } = useI18n()
const userStore = useUserStore()
const username = ref('World')

watchEffect(() => {
  if (userStore.user) username.value = userStore.user.username
})

</script>

<style scoped>
.home {
  position: relative;
  flex: 1;
  height: 100vh;
}
</style>