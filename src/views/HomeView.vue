<template>
  <div class="home">
    <div class="intro">
      <div class="intro-text">
        <h1>{{ t('greetCap') }} <br>
          I'm Peter <br>
        </h1>
        <h3>This is my personal website...</h3>
      </div>
    </div>
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
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - 2em);
  padding: 1em;
  overflow: scroll;
}

.intro {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: 10%;
  margin-right: 10%;
  text-align: start;
}

.intro h1 {
  font-size: 5em;
}
</style>