<template>
  <div class="todo-item-container">
    <div class="todo-item">
      {{ todoItem.text }}
    </div>
    <button @click="deleteTodo"><i class="fi fi-rr-minus-circle"></i></button>
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
  }
})

const emit = defineEmits(['deleteTodo'])
const deleteTodo = () => {
  emit('deleteTodo', { id: props.todoItem.id })
}

</script>

<style>
  .todo-item-container {
    display: flex;
    align-items: center;
    justify-content: center;

    .todo-item {
      margin-bottom: .5em;
    }
  }
</style>