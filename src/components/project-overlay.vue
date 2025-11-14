<template>
  <div class="absolute">
    <h1>Overlay</h1>
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'project-overlay',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    return;
  },
});
</script>

<style lang="scss"></style>