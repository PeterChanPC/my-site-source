<template>
  <div class="todo-view">
    <TodoList class="all"/>
    <TodoList v-for="periodicity in todoStore.periodicities" 
              :periodicity="periodicity"/>
  </div>
</template>

<script setup>
import TodoList from './TodoList.vue'
import { useTodoStore } from '@/stores/todos.store';

const todoStore = useTodoStore()

</script>

<style scoped>
.todo-view {
  display: grid;
  grid-template-areas: "all . ."
                       "all . .";
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1em;
  overflow-y: auto;
  width: calc(100vw - 51px - 2em);
  height: calc(100vh - 2em);
  padding: 1em;
}

.todo-view .all {
  grid-area: all;
}

@media (max-width: 870px) {
  .todo-view {
    width: calc(100vw - 5em);
    padding-left: 4.1875em;
    grid-template-areas: "all";
    grid-template-columns: 1fr;
  }
}
</style>