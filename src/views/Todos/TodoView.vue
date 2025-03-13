<template>
  <div class="todo-view">
    <TodoList class="all-todos" 
              key="all" 
              :todoList="todos"
              @deleteTodo="deleteTodo" 
              @finishTodo="finishTodo"
              @addTodo="addTodo">
    </TodoList>
    <TodoList v-for="(todoList, index) in todoLists" 
              :key="index" 
              :todoList="todoList" 
              :listName="periodicities[index]"
              @deleteTodo="deleteTodo" 
              @finishTodo="finishTodo"
              @addTodo="addTodo">
    </TodoList>
  </div>
</template>

<script setup>
import TodoList from './TodoList.vue'
import Todos from '@/services/todosLocalStorage.service'
import { ref, watch, onBeforeMount } from 'vue'

const todos = ref(Todos.todos)
const todoLists = ref([])
const periodicities = ['daily', 'weekly', 'monthly', 'others']

const refreshAllListsFromMainList = () => {
  periodicities.forEach((periodicity, i) => {
    todoLists.value[i] = todos.value.filter( todo => todo.periodicity === periodicity )
  })
}
onBeforeMount(() => refreshAllListsFromMainList())
watch([todos, todos.value], () => {
  refreshAllListsFromMainList()
  saveTodos()
})
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

const refreshId = () => {
  todos.value.forEach((todo, id) => todo.id = id )
}
const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id )
  refreshId()
}
const finishTodo = (id) => {
  const foundTodo = todos.value.find(todo => todo.id === id)
  foundTodo.done = !foundTodo.done
}
const addTodo = () => {
  const todo = {
    id: todos.value.length,
    task: '',
    repeat: false,
    periodicity: '',
    days: [],
    date: '',
    done: false
  }
  todos.value.push(todo)
}
</script>

<style scoped>
.todo-view {
  width: calc(100vw - 51px - 2em);
  height: calc(100vh - 2em);
  padding: 1em;
  display: grid;
  grid-template-areas: "all . ."
                       "all . .";
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1em;
  overflow-y: auto;
}

.todo-view .all-todos {
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