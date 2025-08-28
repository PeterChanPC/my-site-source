import { defineStore } from 'pinia';
import { ref, computed, watch, Ref } from 'vue';

export const useTodoStore = defineStore('todos', () => {
  // init
  interface TodoItem {
    id: Number,
    task: String,
    repeat: Boolean,
    periodicity: Array<String>,
    days: Array<String>,
    date: Date,
    done: Boolean,
  };
  
  const todoLocalStorage: string | null = localStorage.getItem('todos');
  const todoList: Ref = ref([]);
  if (todoLocalStorage) todoList.value = JSON.parse(todoLocalStorage);

  const todayTodos = computed(() => {
    return todoList.value.filter((todo: TodoItem) => {
      const fullDateNow = new Date()
      const dateNow = fullDateNow.getDate()
      const monthNow = fullDateNow.getMonth()
      const yearNow = fullDateNow.getFullYear()

      const todoFullDate = new Date(todo.date)
      const todoDate = todoFullDate.getDate()
      const todoMonth = todoFullDate.getMonth()
      const todoYear = todoFullDate.getFullYear()
      // check for date
      if (todoDate === dateNow &&
        // check for month
        todoMonth === monthNow &&
        // check for year
        todoYear === yearNow) return true

      return false
    })
  })

  const weekTodos = computed(() => {
    return todoList.value.filter((todo: TodoItem) => {
      const fullDateNow = new Date()
      const dateNow = fullDateNow.getDate()
      const dayNow = fullDateNow.getDay()
      const monthNow = fullDateNow.getMonth()
      const yearNow = fullDateNow.getFullYear()
      const startDateofWeek = dateNow - dayNow

      const todoFullDate = new Date(todo.date)
      const todoDate = todoFullDate.getDate()
      const todoMonth = todoFullDate.getMonth()
      const todoYear = todoFullDate.getFullYear()
      // check for week
      const countdown = todoDate - startDateofWeek;
      if (7 > countdown &&
        countdown > 0 &&
        // check for month
        todoMonth === monthNow &&
        // check for year
        todoYear === yearNow) return true
      return false
    })
  })

  const monthTodos = computed(() => {
    return todoList.value.filter((todo: TodoItem) => {
      const fullDateNow = new Date()
      const monthNow = fullDateNow.getMonth()
      const yearNow = fullDateNow.getFullYear()

      const todoFullDate = new Date(todo.date)
      const todoMonth = todoFullDate.getMonth()
      const todoYear = todoFullDate.getFullYear()
      //check for month
      if (todoMonth === monthNow &&
        // check for year
        todoYear === yearNow) return true
      return false
    })
  })

  function addTodo(todo: TodoItem) {
    todoList.value.push({
      id: todoList.value.length,
      task: todo.task,
      repeat: todo.repeat,
      periodicity: todo.periodicity,
      days: todo.days,
      date: todo.date,
      done: todo.done
    })
  }

  function deleteTodo(id: number) {
    todoList.value = todoList.value.filter((todo: TodoItem) => todo.id !== id)
  }

  function refreshId() {
    todoList.value.forEach((todo: TodoItem, index: number) => {
      todo.id = index
    })
  }

  watch([todoList, todoList.value], () => {
    refreshId()
    localStorage.setItem('todos', JSON.stringify(todoList.value))
  })

  return { todoList, todayTodos, weekTodos, monthTodos, addTodo, deleteTodo }
})