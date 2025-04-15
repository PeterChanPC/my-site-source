<template>
  <button class="switch" @click="change">
    <div :class="['option', {'active': !isActive}]">
      <i v-if="iconL" :class="iconL"></i>
      <span v-if="textL">{{ textL }}</span>
    </div>
    <div :class="['option', {'active': isActive}]">
      <i v-if="iconR" :class="iconR"></i>
      <span v-if="textR">{{ textR }}</span>
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
    iconL: {
      type: String,
      default: '',
    },
    iconR: {
      type: String,
      default: '',
    },
    textL: {
      type: String,
      default: '',
    },
    textR: {
      type: String,
      default: ''
,   },
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