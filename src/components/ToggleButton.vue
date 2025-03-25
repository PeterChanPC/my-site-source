<template>
  <div class="toggle-button" @click="toggle">
    <input type="checkbox" v-model="props.isToggled">
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
  -webkit-transition: background-color 200ms ease;
  transition: background-color 200ms ease;
  -webkit-tap-highlight-color: transparent;
}

.slider .thumb {
  position: relative;
  width: 20px;
  height: 20px;
  margin: 3px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 2px #777777;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.toggled {
  background-color: #2196F3;
}

.toggled .thumb {
  -webkit-transform: translateX(16px);
  transform: translateX(16px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Safari specific adjustments */
@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-appearance: none) {
    .slider {
      -webkit-appearance: none;
      appearance: none;
      background-clip: padding-box;
    }
    .thumb {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }
  }
}
</style>