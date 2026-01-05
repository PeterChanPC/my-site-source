<template>
  <component :is="isExternal ? 'a' : 'router-link'" :class="['flex row a-center h-50 user-select-none pointer', {
    'j-start': shape === 'pill'
  }, { 'j-center': shape === 'round' }, effect,]" :to="isExternal ? undefined : { name: to }"
    :href="isExternal ? to : undefined" :target="target">
    <div class="relative w-50 h-50" v-if="imgSrc">
      <img :src="imgSrc" :alt="to">
    </div>
    <span class="font-size-16 capitalize" v-if="text">{{ text }}</span>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type Target = '_self' | '_blank';
type Shape = 'pill' | 'round';
type Effect = 'underline-l' | 'underline-m';

export default defineComponent({
  name: 'a-hoverable',
  props: {
    isExternal: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '',
    },
    target: {
      type: String as PropType<Target>,
      default: '_self',
    },
    imgSrc: {
      type: String,
      default: '',
    },
    shape: {
      type: String as PropType<Shape>,
      default: 'pill',
    },
    effect: {
      type: String as PropType<Effect>,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="scss"></style>