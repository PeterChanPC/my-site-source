<template>
  <a :class="['flex row a-center h-50', {
    'j-start': shape === 'pill'
  }, { 'j-center': shape !== 'pill' }, effect,]" v-if="href" :href="href" :target="target">
    <div class="relative w-50 h-50" v-if="imgSrc">
      <img :src="imgSrc" :alt="href">
    </div>
    <span class="font-16 capitalize" v-if="text">{{ text }}</span>
  </a>
  <router-link :class="['flex row a-center h-50', {
    'j-start': shape === 'pill'
  }, { 'j-center': shape !== 'pill' }, effect,]" v-if="path" :to="{ name: path }">
    <div class="relative w-50 h-50" v-if="imgSrc">
      <img :src="imgSrc" :alt="path">
    </div>
    <span class="font-16 capitalize" v-if="text">{{ text }}</span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type Target = '_self' | '_blank';
type Shape = 'center' | 'pill';
type Effect = 'underline-l' | 'underline-m';

export default defineComponent({
  name: 'a-hoverable',
  props: {
    path: {
      type: String,
      default: '',
    },
    href: {
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
    text: {
      type: String,
      default: '',
    },
    shape: {
      type: String as PropType<Shape>,
      default: 'center',
    },
    effect: {
      type: String as PropType<Effect>,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss"></style>