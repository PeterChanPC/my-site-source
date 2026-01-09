<template>
  <button class="flex row a-center j-center border-none bg-none w-32 h-32 font-size-16 pointer user-select-none"
    @click="onSwitch">
    <Transition name="switch" mode="out-in">
      <div v-if="isActive">
        <div class="relative" v-if="imgSrcR">
          <img :src="imgSrcR">
        </div>
        <span v-if="textR">{{ textR }}</span>
      </div>
      <div v-else>
        <div class="relative" v-if="imgSrcL">
          <img :src="imgSrcL">
        </div>
        <span v-if="textL">{{ textL }}</span>
      </div>
    </Transition>
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
    onSwitch: {
      type: Function as PropType<() => void>,
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