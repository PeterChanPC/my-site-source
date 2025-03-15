import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTodoStore = defineStore('todos', () => {
  const periodicities = ['daily', 'weekly', 'monthly', 'others']

  const allTodos = ref(JSON.parse(localStorage.getItem('todos')) || [])

  const dailyTodos = computed(() => {
    return allTodos.value.filter((todo) => todo.periodicity === periodicities[0])
  })

  const weeklyTodos = computed(() => {
    return allTodos.value.filter((todo) => todo.periodicity === periodicities[1])
  })

  const monthlyTodos = computed(() => {
    return allTodos.value.filter((todo) => todo.periodicity === periodicities[2])
  })

  const othersTodos = computed(() => {
    return allTodos.value.filter((todo) => todo.periodicity === periodicities[3])
  })

  function addTodo() {
    allTodos.value.push({
      id: allTodos.value.length,
      task: '',
      repeat: false,
      periodicity: '',
      days: [],
      date: '',
      done: false
    })
  }

  watch(allTodos.value, () => {
    console.log('update')
    localStorage.setItem('todos', JSON.stringify(allTodos.value))
  })
  
  return { periodicities, allTodos, dailyTodos, weeklyTodos, monthlyTodos, othersTodos, addTodo }
})