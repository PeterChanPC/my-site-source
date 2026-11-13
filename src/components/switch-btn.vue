<template>
  <button class="flex row a-center j-center w-32 h-32 font-size-16 pointer user-select-none" @click="$emit(SWITCH)">
    <Transition name="switch" mode="out-in">
      <div v-if="isActive">
        <div class="relative" v-if="imgRight">
          <img :src="imgRight" alt="imgRight">
        </div>
        <span v-if="textRight">{{ textRight }}</span>
      </div>
      <div v-else>
        <div class="relative" v-if="imgLeft">
          <img :src="imgLeft" alt="imgLeft">
        </div>
        <span v-if="textLeft">{{ textLeft }}</span>
      </div>
    </Transition>
  </button>
</template>

<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false,
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
})

const SWITCH = 'switch'
defineEmits([SWITCH])
</script>

<style scoped lang="scss"></style>