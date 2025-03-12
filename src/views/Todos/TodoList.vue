<template>
  <div class="todo-list">
    <div class="todo-list-header">
      <div class="todo-list-name">{{ listName }}</div>
      <i class="fi fi-rr-pencil" @click="toggleEdit"></i>
    </div>
    <TodoItem v-bind="$attrs" 
              v-for="todoItem in todoList" 
              :key="todoItem" 
              :todoItem="todoItem"
              :editList="editList">
    </TodoItem>
    <div class="add-todo"
        v-if="editList"
        @click="addTodo">
      <i class="fi fi-rr-plus"></i>
    </div>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'
import { ref } from 'vue'

const props = defineProps({
  todoList: Array,
  listName: {
    type: String,
    default: 'What to do next ...'
  }
})

const editList = ref(false)
const toggleEdit = () => {
  editList.value = !editList.value
}

const emit = defineEmits(['addTodo'])
const addTodo = () => {
  emit('addTodo')
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