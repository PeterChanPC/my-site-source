<template>
  <div class="new-todo-background" :class="{ 'active-background' : showNewTodo }" @click="createTodo"></div>

  <div class="new-todo" :class="{ 'active-box' : showNewTodo }">
    <header class="new-todo-header">
      <span>Create New Todo</span>
    </header>

    <div class="new-todo-details">
      <!-- task, repeat, deadline, description -->
        <div class="new-task">
        <input type="text" placeholder="type your task here..." v-model="todoItem.task">
        </div>

        <div class="new-repeat">
          <span>Is repeating</span>
          <ToggleButton class="toggle-button" @toggle="toggleRepeat" :isToggled="todoItem.repeat"/>
        </div>

        <div class="new-periodicity" :class="{ 'active-new-periodicity' : todoItem.repeat }">
          <span>Repeat</span>
          repeat options
        </div>
       
       <TodoWeek v-if="todoItem.periodicity === 'weekly'"/>
       <TodoMonth v-if="todoItem.periodicity === 'monthly' || todoItem.periodicity === 'others'"/>
    </div>

    <div class="new-todo-sublist">
      <!-- todo's sublist -->
      sublist
    </div>

    <div class="save-todo" @click="todoStore.addTodo">
      <!-- saving into the list -->
      save
    </div>
  </div>
</template>

<script setup>
import ToggleButton from '@/components/ToggleButton.vue'
import TodoWeek from './TodoWeek.vue'
import TodoMonth from './TodoMonth.vue'
import { useTodoStore } from '@/stores/todos.store'
import { ref } from 'vue'

const props = defineProps({
  showNewTodo: Boolean,
})

const periodicities = ['daily', 'weekly', 'monthly']
const todoStore = useTodoStore()

const todoItem = ref({
  id: todoStore.allTodos.length,
  task: '',
  repeat: false,
  periodicity: null,
  days: [],
  date: null,
  done: false
})

const emit = defineEmits(['showNewTodo'])
const createTodo = () => {
  emit('showNewTodo', !props.showNewTodo)
}

const toggleRepeat = () => {
  todoItem.value.repeat = !todoItem.value.repeat
  todoItem.value.periodicity = null
}
</script>

<style scoped>
.new-todo-background {
  position: absolute;
  top: -1em;
  left: -1em;
  display: none;
  width: calc(100% + 1em);
  height: calc(100% + 1em);
  background-color: rgba(0, 0, 0, .5);
  z-index: 98;
}

.active-background {
  display: inline-block;
}

.new-todo {
  position: absolute;
  top: calc(50% / 2);
  left: calc(50% - 500px / 2);
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 50%;
  scale: 0;
  border-radius: 1em;
  background-color: #fff;
  box-shadow: inset 0 0 .3em #777;
  transition: scale 200ms ease;
  overflow-y: scroll;
  z-index: 99;
}

.new-todo::-webkit-scrollbar {
  display: none;
}

.active-box {
  scale: 1;
}

.new-todo-header {
  display: flex;
  flex-direction: column;
}

.new-todo-header span {
  margin: 16px auto 16px 16px;
  font-size: 2em;
  font-weight: bold;
  text-align: start;
}

.new-todo-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.new-task {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 2.5em;
  border-radius: 2em;
  border: 1px solid #777;
}

.new-task input {
  width: calc(100% - 2em);
  height: 100%;
  padding: 0;
  font-size: 18px;
}

.new-repeat span,
.new-periodicity span {
  margin-left: 4em;
}

.new-repeat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 2em);
  height: 4em;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  transition: border-bottom-color 200ms ease;
  z-index: 1;
}

.new-repeat:hover {
  border-bottom-color: #ccc;
}

.new-repeat .toggle-button {
  margin-right: 4em;
}

.new-periodicity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 2em);
  height: 0;
  border-bottom: 1px solid #ddd;
  visibility: hidden;
  transition: border-bottom-color 200ms ease;
  transition: height 200ms ease;
}

.new-periodicity:hover {
  border-bottom-color: #ccc;
}

.active-new-periodicity {
  height: 4em;
  visibility: visible;
}

.new-periodicity select {
  width: 7em;
  height: 2.5em;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  appearance: auto;
}

@media (max-width: 480px) {
  .new-todo {
    left: calc(50% - 300px / 2);
    width: 300px;
  }

  .active-box {
    scale: 1;
  }
 
  .new-repeat span,
  .new-periodicity span {
    margin-left: 2em;
  }

  .new-repeat .toggle-button {
    margin-right: 2em;
  }
}
</style>