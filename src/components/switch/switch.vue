<template>
  <button class="switch" @click="change">
    <div :class="['option', {'active': !isActive}]">
      <slot name="left">1</slot>
    </div>
    <div :class="['option', {'active': isActive}]">
      <slot name="right">2</slot>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'switch-button',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change'],
  setup(_, { emit }) {
    const change = () => {
      emit('change');
    };
    return { change };
  },
});
</script>

<style scoped lang="scss">
@forward './switch.scss';
</style>