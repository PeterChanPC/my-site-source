<template>
  <div class="todo-list">
    <div class="todo-list-header">
      <div class="todo-list-name">{{ name }}</div>
    </div>

    <TodoItem v-for="todoItem in todoList"
              :key="todoItem"
              :todoItem="todoItem"/>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '@/deprecated/#todo-list/#todos.store'
import { ref, watchEffect } from 'vue'

const props = defineProps({
  name: {
    type: String,
  }
})
const todoStore = useTodoStore()
const todoList = ref([])

watchEffect(() => {
  switch(props.name) {
    case 'Today':
      todoList.value = todoStore.todayTodos
      break
    case 'This Week':
      todoList.value = todoStore.weekTodos
      break
    case 'This Month':
      todoList.value = todoStore.monthTodos
      break
    default:
      todoList.value = todoStore.allTodos
      break
  }
})
</script>

<style scoped>
.todo-list {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1em;
  border: 1px solid #ddd;
  background: #eee;
}

.todo-list .todo-list-header {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.todo-list .todo-list-header .todo-list-name {
  padding: 0.7em;
  text-transform: capitalize;
  font-size: 1.5em;
  font-weight: bold;
  text-align: start;
}

.todo-list .todo-list-header i {
  margin: 1em;
  font-size: 1.2em;
}

.todo-list .todo-list-header i:hover {
  cursor: pointer;
}

.todo-list .add-todo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 50px;
  margin-bottom: 1em;
  border-radius: 0.5em;
  border: 1px dashed #aaa;
  cursor: pointer;
  -webkit-transition: border 100ms ease-out;
  transition: border 100ms ease-out;
}

.todo-list .add-todo:hover {
  border-color: #777;
}

.todo-list:hover {
  border-color: #ccc;
}
</style>