<template>
  <div class="todo-item-container">
    <div class="delete" @click="deleteTodo" v-if="editMode">
      <i class="fi fi-rr-minus-circle"></i>
    </div>

    <div class="checkbox" v-else>
      <i class="fi fi-rr-circle" v-if="todoItem.done" @click="finishTodo"></i>
      <i class="fi fi-rr-check-circle" v-else @click="finishTodo"></i>
    </div>

    <div class="todo-item">
      {{ todoItem.text }}
    </div>
  </div>

</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  todoItem: {
    id: Number, 
    text: String, 
    periodicity: String, 
    repeat: String, date: 
    String, 
    done: Boolean
  },
  editMode: Boolean
})

const emit = defineEmits(['deleteTodo', 'finishTodo'])
const deleteTodo = () => {
  emit('deleteTodo', { id: props.todoItem.id })
}
const finishTodo = () => {
  emit('finishTodo', { id: props.todoItem.id })
}

</script>

<style scoped>
  .todo-item-container {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 90%;
    min-height: 50px;
    margin-bottom: 1em;
    border-radius: .5em;
    border: 1px solid #ddd;
    background: #fff;
    
    .delete, .checkbox {
      margin: .7em;
      width: 20px;
      height: 20px;
      font-size: 20px;
      
      &:hover {
        cursor: pointer;
      }
    }

    &:hover {
     border-color: #ccc;
    }
  }
</style>