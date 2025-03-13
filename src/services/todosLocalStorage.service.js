const todos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 0,
    task: 'todo 1',
    repeat: false,
    periodicity: '',
    days: [],
    date: '',
    done: false
  },
  { id: 1,
    task: 'todo 2',
    repeat: false,
    periodicity: '',
    days: [],
    date: '',
    done: false
  },
  { id: 2,
    task: 'todo 3',
    repeat: false,
    periodicity: '',
    days: [],
    date: '',
    done: false
  },
  { id: 3,
    task: 'todo 4',
    repeat: false,
    periodicity: '',
    days: [],
    date: '',
    done: false
  },
  { id: 4,
    task: 'todo 5',
    repeat: false,
    periodicity: '',
    days: [],
    date: '',
    done: false
  }
]

export default { todos }