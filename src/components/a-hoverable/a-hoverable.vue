<template>
  <a class="a-expandable" :href="href" target="_blank">
    <i v-if="icon" :class="icon"></i>
    <span v-if="text">{{ text }}</span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'a-expandable',
  props: {
    href: {
      type: String,
      default: '#',
    },
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss">
@forward './a-hoverable.scss';
</style>