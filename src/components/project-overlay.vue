<template>
  <div class="absolute">
    <h1>Overlay</h1>
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss"></style>