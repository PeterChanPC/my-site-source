<template>
  <div>
    <h1>{{ t('user', { user: user }) }}</h1>
    <h2>{{ d(new Date(), 'short', 'en-US') }}</h2>
    <h2>{{ d(new Date(), 'long') }}</h2>
    <h3>{{ n(8888.88, 'currency') }}</h3>
    <h3>{{ n(8888.88, 'decimal') }}</h3>
    <h3>{{ n(8888.88, 'percent') }}</h3>
    <i18n-n tag="h3" :value="8888.88" format="currency" scope="global">
      <template #currency="props">
        <span style="color: orange; font-weight: bold;">
          {{ props.currency }}
        </span>
      </template>
    </i18n-n>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import authCheck from '@/composables/useAuthCheck.composable'
import auth from '@/stores/auth.store'

const { t, d, n } = useI18n()
const { data, error, handleAuthCheck } = authCheck(auth.token)
const user = ref('User')

onMounted(async () => {
  const isLogin = await handleAuthCheck()
  if (isLogin) user.value = JSON.parse(JSON.stringify(data.value)).firstName
})


</script>

<style>

</style>