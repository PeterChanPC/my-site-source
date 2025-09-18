<template>
  <div ref="projects" class="page projects">
    <Card v-for="work in works"
      :class="[`card-${(work.id - activeWorkId + works.length) % works.length + 1}`, { 'flip': isFlipping }, { 'draw': isDrawing }]"
      :imgSrc="work.img" :path="work.name" :id="work.id" :title="work.name" :description="work.description"
      @click="flip(work.id)" />
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/card/card.vue';
import ListImg from '@/assets/img/fi-rr-list-check.svg';
import UserImg from '@/assets/img/fi-rr-user.svg';
import QuestionImg from '@/assets/img/fi-rr-question.svg';
import { ref } from 'vue';

interface Work {
  id: number,
  name: string,
  img: string,
  description: string,
};
const works = ref<Array<Work>>([
  {
    id: 1,
    name: 'todos',
    img: ListImg,
    description: 'Simple todo list tool',
  },
  {
    id: 2,
    name: 'authentication',
    img: UserImg,
    description: 'Login/Logout system with Authentication based on Access Tokens. Credits to DummyJSON',
  },
  {
    id: 3,
    name: 'test',
    img: QuestionImg,
    description: 'Testing page functionality and stability before implementation',
  },
]);

const activeWorkId = ref<number>(1);
const isFlipping = ref<boolean>(false);
const isDrawing = ref<boolean>(false);
const flip = (id: number) => {
  if (isFlipping.value) return;
  isFlipping.value = true;
  setTimeout(() => {
    if (activeWorkId.value === works.value.length) {
      activeWorkId.value = 1;
    } else {
      activeWorkId.value += 1;
    };
    isFlipping.value = false;
    isDrawing.value = true;
    setTimeout(() => {
      isDrawing.value = false;
    }, 500);
  }, 500);
};
</script>

<style scoped lang="scss">
@forward "./projects";
</style>