<template>
  <div class="new-todo" :class="{ 'active' : showNewTodo }" @click="createTodo">
    <div class="new-todo-header">
      <!-- task name -->
       task name
    </div>

    <div class="new-todo-details">
      <!-- repeat, deadline, description -->
       is repeating
       deadline
    </div>

    <div class="new-todo-catergory">
      <!-- todo's catergory -->
       catergory
    </div>

    <div class="save-todo" @click="todoStore.addTodo">
      <!-- saving into the list -->
      save
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/todos.store'

const props = defineProps({
  showNewTodo: Boolean,
})

const todoStore = useTodoStore()

const emit = defineEmits('showNewTodo')
const createTodo = () => {
  emit('showNewTodo', !props.showNewTodo)
}
</script>

<style scoped>
.new-todo {
  position: absolute;
  top: -1em;
  right: -480px;
  display: flex;
  flex-direction: column;
  width: 480px;
  height: calc(100% + 1em);
  border-left: 1px solid #ddd;
  background-color: #fff;
  transition: right 200ms ease;
  z-index: 99;
}

.active {
  right: 0;
}

@media (max-width: 480px) {
  .new-todo {
    right: -320px;
    width: 320px;
  }

  .active {
    right: 0;
  }
}
</style>