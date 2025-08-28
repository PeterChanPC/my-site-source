<template>
  <a v-if="href" :class="['a-hoverable', shape, effect]" :href="href" :target="target">
    <slot>ERROR</slot>
  </a>
  <router-link v-if="path" :class="['a-hoverable', shape, effect]" :to="{ name: path }">
    <slot>ERROR</slot>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, effect, PropType } from 'vue';

type Target = '_self' | '_blank';
type Shape = 'center' | 'pill';
type Effect = 'underline-left' | 'underline-middle';

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