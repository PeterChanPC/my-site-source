<template>
  <a
  :class="['a-expandable', `theme-${theme}`]"
  :href="link"
  target="_blank"
  >
    <div class="icon">
      <slot name="icon">icon</slot>
    </div>
    <div class="text">
      <slot name="text">text</slot>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'a-expandable',
  props: {
    theme: {
      type: String,
      default: 'light',
    },
    link: {
      type: String,
      default: '#',
    },
  },
})
</script>

<style scoped lang="scss">
@forward './a-expandable.scss';
</style>