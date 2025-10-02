<template>
  <button class="flex row j-center border-none bg-none w-32 h-32 font-16 pointer" @click="change">
    <div :class="['tr-100 a-content-center', { 'w-full o-1': !isActive }, { 'w-0 o-0': isActive }]">
      <div class="relative" v-if="imgSrcL">
        <img :src="imgSrcL">
      </div>
      <span class="" v-if="textL">{{ textL }}</span>
    </div>
    <div :class="['tr-100 a-content-center', { 'w-full o-1': isActive }, { 'w-0 o-0': !isActive }]">
      <div class="relative" v-if="imgSrcR">
        <img :src="imgSrcR">
      </div>
      <span class="" v-if="textR">{{ textR }}</span>
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
    imgSrcL: {
      type: String,
      default: '',
    },
    imgSrcR: {
      type: String,
      default: '',
    },
    textL: {
      type: String,
      default: '',
    },
    textR: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="scss"></style>