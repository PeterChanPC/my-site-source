<template>
  <div class="todo-view">
    <TodoList @deleteTodo="deleteTodo" class="all-todos" key="all" :todoList="todos"/>
    <TodoList @deleteTodo="deleteTodo" v-for="(todoList, index) in todoLists" :key="index" :todoList="todoList" :title="periodicities[index]"/>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import TodoList from './TodoList.vue'

// this todos will have to be moved to app.vue instead of this view
let todos = ref([
  { id: 0, text: 'todo 1', periodicity: 'others', repeat: ['none'], date: null, done: false},
  { id: 1, text: 'todo 2', periodicity: 'weekly', repeat: ['mon', 'fri', 'sat', 'sun', 'other'], date: null, done: false},
  { id: 2, text: 'todo 3', periodicity: 'weekly', repeat: ['wed', 'thu', 'fri', 'sat'], date: null, done: false},
  { id: 3, text: 'todo 4', periodicity: 'monthly', repeat: ['month'], date: null, done: false},
  { id: 4, text: 'todo 5', periodicity: 'daily', repeat: ['day'], date: null, done: false},
  { id: 5, text: 'todo 6', periodicity: 'others', repeat: ['none'], date: null, done: false}
])

const periodicities = ['daily', 'weekly', 'monthly', 'others']

let todoLists = []
watchEffect(() => {
  periodicities.forEach((periodicity, i) => {
    todoLists[i] = todos.value.filter( todo => todo.periodicity === periodicity )
  })
})

const deleteTodo = (target) => {
  todos.value = todos.value.filter(todo => todo.id !== target.id )
}

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