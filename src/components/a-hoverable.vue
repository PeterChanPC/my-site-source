<template>
  <component :is="isExternal ? 'a' : 'router-link'" :class="['flex a-center h-50 user-select-none pointer', {
    'j-start': shape === Shape.Pill
  }, { 'j-center': shape === Shape.Round }, effect,]" :to="isExternal ? undefined : { name: to }"
    :href="isExternal ? to : undefined" :target="target">
    <div class="relative w-50 h-50" v-if="img">
      <img :src="img" :alt="to">
    </div>
    <span class="font-size-16 capitalize" v-if="text">{{ text }}</span>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Shape, HoverEffect, Target } from './d';

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
      default: Target.Self,
    },
    shape: {
      type: String as PropType<Shape>,
      default: Shape.Pill,
    },
    effect: {
      type: String as PropType<HoverEffect>,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  setup() {
    return { Shape };
  },
});
</script>

<style scoped lang="scss"></style>