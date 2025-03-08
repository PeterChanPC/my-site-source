<template>
  <div class="todo-repeat">
    <div class="toggle-repeat">
      <span>Is repeating</span>
      <ToggleButton @toggle="toggleRepeat"/>
    </div>

    <div class="repeat-setting" v-if="isRepeating">
      <!-- after selecting repeat, give period options based on the repeat type -->
      <div class="todo-periodicity">
        <span>Repeat</span>
        <select v-model="periodicity">
          <option value="">---</option>
          <option v-for="item in periodicities" :key="item">{{ item }}</option>
        </select>
      </div>

      <Week v-if="showWeek"/>
      <Month v-if="showMonth"/>
    </div>
  </div>
</template>

<script setup>
import ToggleButton from '@/components/ToggleButton.vue'
import Week from './Week.vue'
import Month from './Month.vue'
import { ref, watch } from 'vue'

const isRepeating = ref(false)
const periodicities = ['daily', 'weekly', 'monthly', 'others']
const periodicity = ref('')
const showWeek = ref(false)
const showMonth = ref(false)

const toggleRepeat = () => {
  isRepeating.value = !isRepeating.value
}

watch(periodicity, (periodicity) => {
  switch(periodicity) {
    case periodicities[1]:
      showWeek.value = true
      showMonth.value = false
      break
    case periodicities[2]:
    case periodicities[3]:
      showWeek.value = false
      showMonth.value = true
      break
    default:
      showWeek.value = false
      showMonth.value = false
  }
})
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
      justify-content: space-around;
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
        justify-content: space-around;
        margin-bottom: 1em;
      }
    }
  }
</style>