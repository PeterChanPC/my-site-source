<template>
  <div class="todo-view">
    <Todo class="all-todos" :todos="todos" :periodicity="periodicity[0]"/>
    <Todo :todos="todos" :periodicity="periodicity[1]"/>
    <Todo :todos="todos" :periodicity="periodicity[2]"/>
    <Todo :todos="todos" :periodicity="periodicity[3]"/>
    <Todo :todos="todos" :periodicity="periodicity[4]"/>
  </div>
</template>

<script setup>
import Todo from '../components/Todo.vue'

const todos = [
  { id: 0, text: 'todo 1', periodicity: 'none', repeat: ['none'], date: null, done: false},
  { id: 1, text: 'todo 2', periodicity: 'weekly', repeat: ['mon', 'fri', 'sat', 'sun', 'other'], date: null, done: false},
  { id: 2, text: 'todo 3', periodicity: 'weekly', repeat: ['wed', 'thu', 'fri', 'sat'], date: null, done: false},
  { id: 3, text: 'todo 4', periodicity: 'monthly', repeat: ['monthly'], date: null, done: false},
  { id: 3, text: 'todo 5', periodicity: 'others', repeat: ['others'], date: null, done: false},
  { id: 4, text: 'todo 6', periodicity: 'none', repeat: ['none'], date: null, done: false}
]

const repeat = ['none', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'others']
const periodicity = ['none', 'daily', 'weekly', 'monthly', 'others']

</script>

<style scoped>
.todo-view {
  width: calc(100vw - 50px - 2.5em);
  height: calc(100vh - 2em);
  padding: 1em 1em 1em 1.5em;

  display: grid;
  grid-template: "all . ." "all . ." / 1fr 1fr 1fr;
  gap: 1em;

  .all-todos {
    grid-area: all;
  }

  @media (max-width: 768px) {
    width: calc(100vw - 5em);
    padding-left: 4.5em;

    grid-template: "all" / 1fr;
  }
}
</style>