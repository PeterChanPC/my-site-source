<template>
  <button class="flex row a-center j-center border-none bg-none w-32 h-32 font-size-16 pointer user-select-none"
    @click="onSwitch">
    <Transition name="switch" mode="out-in">
      <div v-if="isActive">
        <div class="relative" v-if="imgRight">
          <img :src="imgRight">
        </div>
        <span v-if="textRight">{{ textRight }}</span>
      </div>
      <div v-else>
        <div class="relative" v-if="imgLeft">
          <img :src="imgLeft">
        </div>
        <span v-if="textLeft">{{ textLeft }}</span>
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
    imgLeft: {
      type: String,
      default: '',
    },
    imgRight: {
      type: String,
      default: '',
    },
    textLeft: {
      type: String,
      default: '',
    },
    textRight: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="scss"></style>