<template>
  <div>
    <h1>{{ t('user', { user: 'User' }) }}</h1>
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
import { useI18n } from 'vue-i18n'
const { t, d, n } = useI18n()
</script>

<style>

</style>