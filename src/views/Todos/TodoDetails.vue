<template>
  <div class="todo-details">
    <TodoRepeat :todoItem="todoItem" v-if="editTodo">
    </TodoRepeat>
    <TodoSublist>
    </TodoSublist>
  </div>
</template>

<script setup>
import TodoRepeat from './TodoRepeat.vue'
import TodoSublist from './TodoSublist.vue'

const props = defineProps({
  todoItem: {
    id: Number,
    task: String,
    repeat: Boolean,
    periodicity: String,
    days: Array,
    date: Date,
    done: Boolean
  },
  editTodo: Boolean
})
</script>

<style scoped>

.todo-details {
  position: relative;
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
}
</style>