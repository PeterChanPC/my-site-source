import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todos', () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || []
  const periodicities = ['daily', 'weekly', 'monthly', 'others']

  const allTodos = ref({name: 'all', list: todos })
  
  const dailyTodos = ref({
    name: 'daily',
    list: todos.filter((todo) => {
      todo.periodicity === periodicities[0]
    })
  })

  const weeklyTodos = ref({
    name: 'weekly',
    list: todos.filter((todo) => {
      todo.periodicity === periodicities[1]
    })
  })
z
  const monthlyTodos = ref({
    name: 'monthly',
    list: todos.filter((todo) => {
      todo.periodicity === periodicities[2]
    })
  })

  const othersTodos = ref({
    name: 'others',
    list: todos.filter((todo) => {
      todo.periodicity === periodicities[3]
    })
  })  

  
  watch(state, () => {
    refreshId()
    saveTodos()
  })

  function getTodos(type) {
    switch(type) {
      case 'all':
        return allTodos
      case 'daily':
        return dailyTodos
      case 'weekly':
        return weeklyTodos
      case 'monthly':
        return monthlyTodos
      case 'others':
        return othersTodos
    }
  }

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function refreshId() {
    todos.forEach( (todo, id) => todo.id = id )
  }

  function deleteTodo(id) {
    todos = todos.filter( todo => todo.id !== id )
  }

  function finishTodo(id) {
    const finishItem = todos.find(todo => todo.id === id)
    finishItem.done = !finishItem.done
  }

  function addTodo() {
    todos.push({
      id: todos.length,
      task: '',
      repeat: false,
      periodicity: '',
      days: [],
      date: '',
      done: false
    })
  }
  
  return { periodicities, allTodos, dailyTodos, weeklyTodos, monthlyTodos, othersTodos, getTodos, deleteTodo, finishTodo, addTodo }
})