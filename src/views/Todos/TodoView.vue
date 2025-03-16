<template>
  <div class="todo-view">
    <Header/>
    <div class="options">
      <span>What to do next ...</span>
      <div class="add-todo" @click="todoStore.addTodo">
        <span class="add-todo-text">Create</span>
        <i class="fi fi-rr-plus"></i>
      </div>
    </div>

    <div class="todo-lists">
      <TodoList name="All"/>
      <TodoList name="Today"/>
      <TodoList name="This Week"/>
      <TodoList name="This Month"/>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import TodoList from './TodoList.vue'
import { useTodoStore } from '@/stores/todos.store';

const todoStore = useTodoStore()

</script>

<style scoped>
.todo-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - 2em);
  padding: 1em;
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-todo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6em;
  height: 3em;
  border-radius: 2em;
  margin-right: 1em;
  cursor: pointer;
  transition: background-color 200ms ease;
}

.add-todo i {
  margin-top: 4px;
}

.add-todo:hover {
  background-color: #eee;
}

.add-todo-text {
  margin: 0 5px;
  font-size: 1em;
  font-weight: 100;
}

span {
  margin: 1rem 0 0 1rem;
  font-size: 3em;  
  font-weight: bold;
  text-align: start;
}

.todo-lists {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1em;
  flex: 1;
  margin-top: 1em;
}

@media (max-width: 780px) {
  .todo-lists {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .todo-lists {
    grid-template-columns: 1fr;
  }
}
</style>