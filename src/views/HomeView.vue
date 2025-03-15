<template>
  <div class="home">
    <h1>{{ t('user', { user: username }) }}</h1>
    <h2>{{ d(new Date(), 'short', 'en-US') }}</h2>
    <h2>{{ d(new Date(), 'long') }}</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, d } = useI18n()
const username = ref('World')

</script>

<style scoped>
.home {
  position: relative;
  width: calc(100vw - 51px - 2em);
  height: calc(100vh - 2em);
}

@media (max-width: 870px) {
  .home {
    width: calc(100vw - 5em);
    padding-left: 4.1875em;
  }
}
</style>