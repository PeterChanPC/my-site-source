<template>
  <div class="page projects">
    <div class="cards-wrapper">
      <Card v-for="detail in details" :src="detail.img" :path="detail.name" :title="detail.name"
        :description="detail.description" />
    </div>

    <div ref="dumper" class="dumper"></div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/card/card.vue';
import ListImg from '@/assets/img/fi-rr-list-check.svg';
import UserImg from '@/assets/img/fi-rr-user.svg';
import QuestionImg from '@/assets/img/fi-rr-question.svg';
import { Ref, useTemplateRef } from 'vue';

const details = [
  {
    name: 'todos',
    img: ListImg,
    description: 'a super long description that is used to test the wrapping and text visibility for this card',
  },
  {
    name: 'authentication',
    img: UserImg,
    description: 'a super long description that is used to test the wrapping and text visibility for this card',
  },
  {
    name: 'test',
    img: QuestionImg,
    description: 'a super long description that is used to test the wrapping and text visibility for this card',
  },
];

const dumper: Ref<HTMLDivElement | null> = useTemplateRef('dumper');

const onDrag = () => {

};
</script>

<style scoped lang="scss">
@forward "./projects";
</style>