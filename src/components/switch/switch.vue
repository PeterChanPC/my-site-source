<template>
  <button class="switch" @click="change">
    <div :class="['option', { 'active': !isActive }]">
      <slot name="optionL">IMG ERROR</slot>
    </div>
    <div :class="['option', { 'active': isActive }]">
      <slot name="optionR">IMG ERROR</slot>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'switch-button',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    change: {
      type: Function as PropType<(event: MouseEvent) => void>,
      default: () => { },
    },
  },
});
</script>

<style scoped lang="scss">
@forward './switch.scss';
</style>