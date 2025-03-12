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
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: auto;
  height: auto;
  -webkit-backface-visibility: hidden; /* Prevent rendering issues */
  backface-visibility: hidden;
}
</style>