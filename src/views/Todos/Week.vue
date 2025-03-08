<template>
  <div class="week">
    <div class="day" 
        v-for="day in week"
        :key="day"
        :class="{ 'selected' : day.isSelected }"
        @click="select(day)"
        >
        <div>{{ day.day }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const week = ref([
  {day: 'mo', isSelected: false}, 
  {day: 'tu', isSelected: false}, 
  {day: 'we', isSelected: false}, 
  {day: 'th', isSelected: false}, 
  {day: 'fr', isSelected: false}, 
  {day: 'sa', isSelected: false}, 
  {day: 'su', isSelected: false}
])

const select = (day) => {
  day.isSelected = !day.isSelected
}
</script>

<style scoped>
  .week {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: auto;
    height: 3em;
    border: 1px solid #ddd;
    border-radius: .5em;
    background: #eee;

    .day {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      max-width: 1em;
      max-height: 1em;
      padding: .5em;
      border-radius: 5px;
      border: 1px solid transparent;
      cursor: pointer;
      text-transform: capitalize;
      user-select: none;

      @media (max-width: 436px) {
        padding: .4em;
      }
    }

    .selected {
      border: 1px solid #ddd;
      background: #fff;
      box-shadow: 0 1px 1px #777;

      &:hover {
        border: 1px solid #ccc;
      }
    }

    &:hover {
      border: 1px solid #ccc;
    }
  }
</style>