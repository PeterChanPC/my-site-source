<template>
  <div class="todo-repeat">
    <div class="toggle-repeat">
      <span>Is repeating</span>
      <ToggleButton @toggle="toggleRepeat"
                    :isToggled="todoItem.repeat">
      </ToggleButton>
    </div>

    <div class="repeat-setting" v-if="todoItem.repeat">
      <!-- after selecting repeat, give period options based on the repeat type -->
      <div class="todo-periodicity">
        <span>Repeat</span>
        <select v-model="todoItem.periodicity">
          <option value="">---</option>
          <option v-for="periodicity in periodicities" :key="periodicity">
            {{ periodicity }}
          </option>
        </select>
      </div>

      <Week v-if="todoItem.periodicity === 'weekly'"/>
      <Month v-if="todoItem.periodicity === 'monthly' || todoItem.periodicity === 'others'"/>
    </div>
  </div>
</template>

<script setup>
import ToggleButton from '@/components/ToggleButton.vue'
import Week from './TodoWeek.vue'
import Month from './TodoMonth.vue'
import { ref } from 'vue'

const props = defineProps({
  todoItem: {
    id: Number,
    task: String,
    repeat: Boolean,
    periodicity: String,
    days: Array,
    date: Date,
    done: Boolean
  }
})

const periodicities = ['daily', 'weekly', 'monthly', 'others']

const todoItem = ref(props.todoItem)
const toggleRepeat = (repeat) => {
  todoItem.value.repeat = repeat
  todoItem.value.periodicity = ''
}
</script>

<style scoped>
.todo-repeat {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: auto;
  height: auto;
  margin-bottom: 5px;
}

.todo-repeat .toggle-repeat {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: auto;
  height: auto;
  padding: 0 10%;
  margin-bottom: .5em;
}

.todo-repeat .repeat-setting {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  padding: 10px 5% 5px 5%;
  border-top: 1px solid #ddd;
}

.todo-repeat .repeat-setting .todo-periodicity {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  margin-bottom: .5em;
}

.todo-repeat .repeat-setting .todo-periodicity select {
  position: relative;
  -webkit-flex: 0.6;
  flex: 0.6;
  width: auto;
  height: 2.3em;
  padding: 0.2em;
  border: 1px solid #ddd;
  border-radius: 2em;
  text-align: center;
  font-size: .8em;
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
  appearance: menulist;
  -webkit-transition: border 200ms ease;
  transition: border 200ms ease;
}

.todo-repeat .repeat-setting .todo-periodicity select:hover {
  border: 1px solid #ccc;
  -webkit-transition: border 200ms ease;
  transition: border 200ms ease;
}

/* Safari-specific fixes */
@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-appearance: none) {
    .todo-repeat .repeat-setting .todo-periodicity select {
      -webkit-appearance: none;
      appearance: none;
      background: #fff url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>") no-repeat right 0.8em center/12px;
      padding-right: 2em;
    }
  }
}
</style>