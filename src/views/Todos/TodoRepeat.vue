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
import Week from './Week.vue'
import Month from './Month.vue'
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
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
    margin-bottom: 5px;

    .toggle-repeat {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: auto;
      height: auto;
      padding: 0 10% 0 10%;
      margin-bottom: 5px;
    }

    .repeat-setting {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 10px 10% 5px 10%;
      border-top: 1px solid #ddd;

      .todo-periodicity {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1em;

        select {
          position: relative;
          flex: .6;
          width: auto;
          height: 2.5em;
          padding: .5em;
          border: 1px solid #ddd;
          border-radius: 2em;
          text-align: center;
          appearance: auto;
          transition: .2s;
          
          &:hover {
            border: 1px solid #ccc;
          }
          
        }
      }
    }
  }
</style>