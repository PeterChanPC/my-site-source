<template>
  <div class="page projects">
    <Card v-for="detail in details" :imgSrc="detail.img" :path="detail.name" :title="detail.id + '. ' + detail.name"
      :description="detail.description" />
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/card/card.vue';
import ListImg from '@/assets/img/fi-rr-list-check.svg';
import UserImg from '@/assets/img/fi-rr-user.svg';
import QuestionImg from '@/assets/img/fi-rr-question.svg';

const details = [
  {
    id: 1,
    name: 'todos',
    img: ListImg,
    description: 'a long description that is used to test the wrapping and text visibility for this card',
  },
  {
    id: 2,
    name: 'authentication',
    img: UserImg,
    description: 'a super long description that is used to test the wrapping and text visibility for this card',
  },
  {
    id: 3,
    name: 'test',
    img: QuestionImg,
    description: 'a super long description that is used to test the wrapping and text visibility for this card',
  },
  {
    id: 4,
    name: 'test',
    img: QuestionImg,
    description: 'a super long description that is used to test the wrapping and text visibility for this card',
  },
  {
    id: 5,
    name: 'test',
    img: QuestionImg,
    description: 'a super long description that is used to test the wrapping and text visibility for this card',
  },
];
</script>

<style scoped lang="scss">
@forward "./projects";
</style>