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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    width: 90%;
    min-height: 50px;
    margin-bottom: 1em;
    border-radius: .5em;
    border: 1px solid #ddd;
    background: #fff;
    
    .delete, .checkbox, .options {
      position: absolute;
      margin: .7em;
      width: 20px;
      height: 20px;
      font-size: 20px;
      cursor: pointer;
      z-index: 99;
    }
    .delete, .checkbox {
      left: 0;
      top: 0;
    }
    .options {
      right: 0;
      top: 0;
    }

    .todo-item {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      
      .todo-item-header {
        position: relative;
        display: flex;
        flex-direction: rows;
        align-items: center;
        width: auto;
        height: 50px;
        margin-left: 48px;

        input {
          position: relative;
          width: 65%;
          height: auto;
          padding: .3em 0;
          border-bottom: 1px solid #ddd;
          font-size: 1em;
        }
      }
    }

    &:hover {
     border-color: #ccc;
    }
  }
</style>