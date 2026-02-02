<template>
  <div class="toggle-button" @click="toggle">
    <input type="checkbox" v-model="props.isToggled">
    <div class="slider" :class="{ 'toggled': isToggled }">
      <div class="thumb" :style="thumbPosition"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isToggled: Boolean
})

const emit = defineEmits(['toggle'])

const toggle = () => {
  emit('toggle')
}

const thumbPosition = computed(() => ({
  transform: props.isToggled ? 'translateX(16px)' : ''
}))

</script>

<style scoped>
input {
  display: none;
}

.slider {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  width: 42px;
  height: 26px;
  border-radius: 26px;
  border: 1px solid #ddd;
  background-color: #eee;
  cursor: pointer;
  transition: background-color 200ms ease;
}

.slider .thumb {
  position: relative;
  width: 20px;
  height: 20px;
  margin: 3px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 2px #777777;
  transition: all 200ms ease;
  transform: translateX(0);
}

.toggled {
  background-color: #2196F3;
}

.toggled .thumb {
  transform: translateX(16px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>