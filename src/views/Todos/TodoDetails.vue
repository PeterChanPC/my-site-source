<template>
  <div class="todo-details">
    <!-- Todo Repeat Setting -->
    <TodoRepeat/>
    <!-- Todo Sub Tasks -->
    <TodoSublist/>
  </div>
  
</template>

<script setup>
import TodoRepeat from './TodoRepeat.vue';
import TodoSublist from './TodoSublist.vue';

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