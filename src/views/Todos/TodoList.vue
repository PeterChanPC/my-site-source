<template>
  <div class="todo-list">
    <div class="todo-list-header">
      <div class="todo-list-name">{{ periodicity }}</div>
      <i class="fi fi-rr-plus" @click="toggleEdit"></i>
    </div>

    <TodoItem v-for="todoItem in todoList"
              :key="todoItem"
              :todoItem="todoItem"/>

    <div class="add-todo"
        v-if="edit"
        @click="todoStore.addTodo">
      <i class="fi fi-rr-plus"></i>
    </div>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '@/stores/todos.store'
import { ref } from 'vue'

const props = defineProps({
  periodicity: {
    type: String,
    default: 'What to do next ...',
  }
})
const todoStore = useTodoStore()
const todoList = ref([])

switch(props.periodicity) {
  case todoStore.periodicities[0]:
    todoList.value = todoStore.dailyTodos
    break
  case todoStore.periodicities[1]:
    todoList.value = todoStore.weeklyTodos
    break
  case todoStore.periodicities[2]:
    todoList.value = todoStore.monthlyTodos
    break
  case todoStore.periodicities[3]:
    todoList.value = todoStore.othersTodos
    break
  default:
    todoList.value = todoStore.allTodos
    break
}

const edit = ref(false)
const toggleEdit = () => {
  edit.value = !edit.value
}
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