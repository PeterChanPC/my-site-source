<template>
  <div class="todo" v-if="isAdding">
    <div class="todo-header">
      <!-- inputing the main task -->
      <div class="add" @click="handleAdd"><i class="fi fi-rr-minus-circle"></i></div>
      <input type="text" 
            v-model="todoTask" 
            v-if="isAdding" 
            placeholder="Type your todo ...">
    </div>

    <TodoDetails/>

    <div class="save-todo">
      <!-- save the todo item -->
      Save
    </div>
  </div>

  <div class="todo" v-else>
    <div class="todo-header">
      <!-- toggle add new todo -->
      <div class="add" @click="handleAdd">
        <i class="fi fi-rr-add"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoDetails from './TodoDetails.vue'
import { ref } from 'vue'

const isAdding = ref(false)
const todoTask = ref('')

const handleAdd = () => {
  isAdding.value = !isAdding.value
}
</script>

<style scoped>
  .todo {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 90%;
    min-height: 50px;
    margin-bottom: 1em;
    border-radius: .5em;
    border: 1px solid #ddd;
    background-color: #fff;
    box-shadow: 0 1px 1px #ccc;

    .todo-header {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: auto;
      height: 50px;

      .add {
        position: relative;
        width: 20px;
        height: 20px;
        margin: 14px;
        font-size: 20px;

        &:hover {
          cursor: pointer;
        }
      }

      input {
        position: relative;
        width: 80%;
        height: 20px;
        padding: .3em;
        margin: .4em;
        margin-left: 0;
        border-bottom: 1px solid #ddd;
        font-size: 1em;
      }
    }

    &:hover {
      border: 1px solid #ccc;
    }
  }
</style>