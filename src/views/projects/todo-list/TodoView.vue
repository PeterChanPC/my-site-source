<template>
  <div class="todo-view">
    <ViewHeader routeName="my practices"/>
    <div class="options">
      <span>What to do next ...</span>

      <div class="todo-options">
        <div class="create-todo" @click="createTodo">
          <span class="create-todo-span">Create</span>
          <i class="fi fi-rr-plus"></i>
        </div>

        <div class="edit-todo" @click="">
          <span class="edit-todo-span">Edit</span>
          <i class="fi fi-rr-pencil"></i>
        </div>
      </div>
    </div>

    <div class="todo-lists">
      <TodoList name="All"/>
      <TodoList name="Today"/>
      <TodoList name="This Week"/>
      <TodoList name="This Month"/>
    </div>

    <NewTodo :showNewTodo="showNewTodo" @showNewTodo="createTodo"/>
  </div>
</template>

<script setup>
import ViewHeader from '@/components/ViewHeader.vue';
import TodoList from './TodoList.vue'
import NewTodo from './NewTodo.vue';
import { ref } from 'vue';

const showNewTodo = ref(false)
const createTodo = () => {
  showNewTodo.value = !showNewTodo.value
}

</script>

<style scoped>
.todo-view {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - 2em);
  padding: 1em;
  overflow-x: hidden;
  overflow-y: scroll;
}

.todo-view::-webkit-scrollbar { 
  /* hide scroll bar */
  display: none;
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todo-options {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1em;
  margin-right: 1em;
}

span {
  margin: 1rem 0 0 1rem;
  font-size: 3em;  
  font-weight: bold;
  text-align: start;
}

.todo-options span {
  margin: 0;
  margin-right: 5px;
  font-size: 1em;
  font-weight: 100;
}

.create-todo,
.edit-todo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6em;
  height: 2em;
  margin-right: 1em;
  border-radius: 3em;
  cursor: pointer;
  user-select: none;
  transition: background-color 200ms ease;
}

.create-todo:hover,
.edit-todo:hover {
  background-color: #eee;
}

.todo-lists {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1em;
  flex: 1;
  margin-top: 1em;
}

@media (max-width: 1300px) {
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