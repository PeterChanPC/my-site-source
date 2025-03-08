const periodicities = [
  { name: 'daily', isSelected: false },
  { name: 'weekly', isSelected: false },
  { name: 'monthly', isSelected: false },
  { name: 'others', isSelected: false },
  { name: 'none', isSelected: false },
]

const days = [
  {day: 'mo', isSelected: false}, 
  {day: 'tu', isSelected: false}, 
  {day: 'we', isSelected: false}, 
  {day: 'th', isSelected: false}, 
  {day: 'fr', isSelected: false}, 
  {day: 'sa', isSelected: false}, 
  {day: 'su', isSelected: false}
]

const todos = [
  { id: 0,
    task: 'todo 1',
    periodicities: periodicities,
    days: days,
    date: '',
    done: false
  },
  { id: 1,
    task: 'todo 2',
    periodicities: periodicities,
    days: days,
    date: '',
    done: false
  },
  { id: 2,
    task: 'todo 3',
    periodicities: periodicities,
    days: days,
    date: '',
    done: false
  },
  { id: 3,
    task: 'todo 4',
    periodicities: periodicities,
    days: days,
    date: '',
    done: false
  },
  { id: 4,
    task: 'todo 5',
    periodicities: periodicities,
    days: days,
    date: '',
    done: false
  }
]

export default { todos }