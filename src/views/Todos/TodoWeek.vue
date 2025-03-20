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
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  width: 80%;
  height: 3em;
  margin: 1em;
  border: 1px solid #ddd;
  border-radius: 0.5em;
  background: #eee;
}

.week .day {
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  max-width: 1em;
  max-height: 1em;
  padding: 0.5em;
  border-radius: 5px;
  border: 1px solid transparent;
  cursor: pointer;
  text-transform: capitalize;
  -webkit-user-select: none;
  user-select: none;
  -webkit-transition: padding 200ms ease;
  transition: padding 200ms ease;
  transition: border-color 200ms ease;
}

.week .selected {
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: 0 1px 1px #777777;
}

.week .selected:hover {
  border: 1px solid #ccc;
}

.week:hover {
  border: 1px solid #ccc;
}

@media (max-width: 436px), (min-width: 870px) and (max-width: 1117px) {
  .week {
    height: 2.5em;
  }

  .week .day {
    font-size: .8em;
  }
}
</style>