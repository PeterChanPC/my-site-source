<template>
  <a v-if="href" :class="['a-hoverable', shape, effect]" :href="href" :target="target">
    <div v-if="imgSrc" class="img-wrapper">
      <img :src="imgSrc" :alt="href">
    </div>
    <span v-if="text">{{ text }}</span>
    <span v-if="(text && effect === 'slide')">{{ text }}</span>
  </a>
  <router-link v-if="path" :class="['a-hoverable', shape, effect]" :to="{ name: path }">
    <div v-if="imgSrc" class="img-wrapper">
      <img :src="imgSrc" :alt="path">
    </div>
    <span v-if="text">{{ text }}</span>
    <span v-if="(text && effect === 'slide')">{{ text }}</span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, effect, PropType } from 'vue';

type Target = '_self' | '_blank';
type Shape = 'center' | 'pill';
type Effect = 'underline-left' | 'underline-middle' | 'slide';

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

<style scoped lang="scss">
@forward './a-hoverable.scss';
</style>