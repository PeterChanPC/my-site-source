<template>
  <div v-if="href">
    <a :class="['a-hoverable', effect]" :href="href" :target="target">
      <i v-if="icon" :class="icon"></i>
      <span v-if="text">{{ text }}</span>
    </a>
  </div>
  <div v-if="path">
    <router-link :class="['a-hoverable', effect]" :to="{ name: path }">
      <i v-if="icon" :class="icon"></i>
      <span v-if="text">{{ text }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, effect } from 'vue';

export default defineComponent({
  name: 'a-hoverable',
  props: {
    path: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '_self',
    },
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    effect: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss">
@forward './a-hoverable.scss';
</style>