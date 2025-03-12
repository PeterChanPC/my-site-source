<template>
  <div class="todo-item-container">
    <div class="delete" @click="deleteTodo" v-if="editList || editTodo">
      <i class="fi fi-rr-minus-circle"></i>
    </div>
    <div class="checkbox" v-else>
      <i class="fi fi-rr-check-circle" v-if="todoItem.done" @click="finishTodo"></i>
      <i class="fi fi-rr-circle" v-else @click="finishTodo"></i>
    </div>
    
    <div class="todo-item">
      <div class="todo-item-header">
        <input type="text" placeholder="Type your todo ..." v-model="todoItem.task" v-if="editTodo"/>
        <div class="todo-task" v-else>{{ todoItem.task }}</div>
      </div>

      <TodoDetails :todoItem="todoItem" :editTodo="editTodo">
      </TodoDetails>
    </div>
  
    <div class="options" @click="toggleEdit">
      <i class="fi fi-rr-menu-dots-vertical"></i>
    </div>
  </div>
</template>

<script setup>
import TodoDetails from './TodoDetails.vue'
import { ref } from 'vue'

const props = defineProps({
  todoItem: {
    id: Number, 
    task: String, 
    repeat: Boolean,
    periodicity: Array, 
    days: Array, 
    date: Date, 
    done: Boolean
  },
  editList: Boolean
})

const todo = ref(props.todoItem)

const emit = defineEmits(['deleteTodo', 'finishTodo'])
const deleteTodo = () => {
  emit('deleteTodo', props.todoItem.id)
}
const finishTodo = () => {
  todo.value.done = !todo.value.done
}

const editTodo = ref(false)
const toggleEdit = () => {
  editTodo.value = !editTodo.value
}
</script>

<style scoped>
.todo-item-container {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  width: 90%;
  min-height: 50px;
  margin-bottom: 1em;
  border-radius: 0.5em;
  border: 1px solid #ddd;
  background: #fff;
}

.todo-item-container .delete,
.todo-item-container .checkbox,
.todo-item-container .options {
  position: absolute;
  margin: 0.7em;
  width: 20px;
  height: 20px;
  font-size: 20px;
  cursor: pointer;
  z-index: 99;
  -webkit-tap-highlight-color: transparent;
}

.todo-item-container .delete,
.todo-item-container .checkbox {
  left: 0;
  top: 0;
}

.todo-item-container .options {
  right: 0;
  top: 0;
}

.todo-item-container .todo-item {
  position: relative;
  -webkit-flex: 1;
  flex: 1;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.todo-item-container .todo-item .todo-item-header {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  width: auto;
  height: 50px;
  margin-left: 48px;
}

.todo-item-container .todo-item .todo-item-header input {
  position: relative;
  width: 65%;
  height: auto;
  padding: 0.3em 0;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}

.todo-item-container:hover {
  border-color: #ccc;
  -webkit-transition: border-color 100ms ease;
  transition: border-color 100ms ease;
}

/* Safari-specific media query if needed */
@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-appearance: none) {
    .todo-item-container .todo-item .todo-item-header {
      margin-left: 44px; /* Adjust if needed for Safari spacing */
    }
  }
}
</style><style scoped>
.todo-item-container {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  width: 90%;
  min-height: 50px;
  margin-bottom: 1em;
  border-radius: 0.5em;
  border: 1px solid #ddd;
  background: #fff;
}

.todo-item-container .delete,
.todo-item-container .checkbox,
.todo-item-container .options {
  position: absolute;
  margin: 0.7em;
  width: 20px;
  height: 20px;
  font-size: 20px;
  cursor: pointer;
  z-index: 99;
  -webkit-tap-highlight-color: transparent;
}

.todo-item-container .delete,
.todo-item-container .checkbox {
  left: 0;
  top: 0;
}

.todo-item-container .options {
  right: 0;
  top: 0;
}

.todo-item-container .todo-item {
  position: relative;
  -webkit-flex: 1;
  flex: 1;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.todo-item-container .todo-item .todo-item-header {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  width: auto;
  height: 50px;
  margin-left: 48px;
}

.todo-item-container .todo-item .todo-item-header input {
  position: relative;
  width: 65%;
  height: auto;
  padding: 0.3em 0;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}

.todo-item-container:hover {
  border-color: #ccc;
  -webkit-transition: border-color 100ms ease;
  transition: border-color 100ms ease;
}

/* Safari-specific media query if needed */
@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-appearance: none) {
    .todo-item-container .todo-item .todo-item-header {
      margin-left: 44px; /* Adjust if needed for Safari spacing */
    }
  }
}
</style>