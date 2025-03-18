<template>
  <header class="header">
    <div class="last-page" @click="router.push({ name: routeName })">
      <i class="fi fi-rr-arrow-left-from-line"></i>
    </div>
    <span>{{ $route.name }}</span>
  </header>
</template>

<script setup>
import router from '@/router';

const props = defineProps({
  routeName: String,
})
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  height: 3em;
}

.last-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-size: 1.3em;
  cursor: pointer;
}

span {
  padding-bottom: 5px;
  margin-left: 1em;
  font-size: 1.5em;
  text-transform: capitalize;
}
</style>