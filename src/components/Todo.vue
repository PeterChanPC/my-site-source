<template>
  <div class="todo-list">
    <h2 class="list-title" v-if="props.periodicity !== 'none'">{{ props.periodicity }}</h2>
    <h2 class="list-title" v-else>What To Do Next...</h2>
    <ul>
      <li class="todo-item" v-for="todo in filteredTodos" :key="todo.id">{{ todo.text }}</li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  todos: {
    id: Number, text: String, periodicity: String, repeat: String, date: String, done: Boolean
  },
  periodicity: String
})

const filteredTodos = computed(() => {
  if (props.periodicity === 'none') return props.todos
  else if (props.periodicity === 'others') return props.todos.filter((todo) => todo.periodicity === 'others' || todo.periodicity === 'none')
  return props.todos.filter((todo) => todo.periodicity === props.periodicity)
})

</script>

<style scoped>
  .todo-list {
    border: 2px solid #eee;
    border-radius: 1em;

    &:hover {
      border-color: #ddd;

      .list-title {
        border-color: #ddd;
      }
    }
      
    .list-title {
      margin-bottom: .5em;
      padding: .5em .5em;
      
      border-bottom: 2px solid #eee;

      text-transform: capitalize;
    }

    .todo-item {
      margin-bottom: .5em;
    }
  }

</style>