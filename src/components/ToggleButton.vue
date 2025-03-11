<template>
  <div class="toggle-button" @click="toggle">
    <input type="checkbox" v-model="isToggled">
    <div class="slider" :class="{ 'toggled' : isToggled }">
      <div class="thumb" :style="thumbPosition"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  isToggled: Boolean
})

const isToggled = ref(props.isToggled)
const emit = defineEmits(['toggle'])

const toggle = () => {
  isToggled.value = !isToggled.value
  emit('toggle', isToggled.value)
}

const thumbPosition = computed(() => ({
  transform: isToggled.value ? 'translateX(16px)' : ''
}))

</script>

<style scoped>
  input {
    display: none;
  }

  .slider {
    position: relative;
    display: flex;
    align-items: center;
    width: 42px;
    height: 26px;
    border-radius: 26px;
    border: 1px solid #ddd;
    background-color: #eee;
    cursor: pointer;
    transition: .2s;
    
    .thumb {
      position: relative;
      width: 20px;
      height: 20px;
      margin: 3px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 1px 2px #777;
      transition: .2s;
    }
  }
  
  .toggled {
    background-color: #2196F3;
  }

</style>