<template>
  <div class="todo-list">
    <div class="todo-title">{{ title }}</div>
    <TodoItem v-bind="$attrs" v-for="todoItem in todoList" :key="todoItem.id" :todoItem="todoItem"/>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'
import { defineProps } from 'vue'

const props = defineProps({
  todoList: Array,
  title: {
    type: String,
    default: 'What to do next ...'
  }
})

</script>

<style scoped>
  .todo-list {
    border: 2px solid #eee;
    border-radius: 1em;

    &:hover {
      border-color: #ddd;

      .todo-title {
        border-color: #ddd;
      }
    }
      
    .todo-title {
      position: relative;
      margin-bottom: .5em;
      padding: .5em .5em;
      border-bottom: 2px solid #eee;
      text-transform: capitalize;
    }
  }

</style>