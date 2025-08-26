<template>
  <div v-if="href">
    <a :class="['a-hoverable', effect]" :href="href" :target="target">
      <slot>ERROR</slot>
    </a>
  </div>
  <div v-if="path">
    <router-link :class="['a-hoverable', effect]" :to="{ name: path }">
      <slot>ERROR</slot>
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