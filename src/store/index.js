import { createStore } from 'vuex'

export default createStore({
  state: {
    lists: [
      {id: '1', name: 'Todo'},
      {id: '2', name: 'Completed'},
      {id: '3', name: 'Done'},
    ]
    ,
    tasks: {
      '1': [
          {id: '1', name: '1️⃣learn something', isDone: false},
          {id: '2', name: '1️⃣learn Vue', isDone: true},
          {id: '3', name: '1️⃣learn Angular', isDone: false},
          ],
      '2': [
        {id: '1', name: '2️⃣learn something', isDone: false},
        {id: '2', name: '2️⃣learn Vue', isDone: false},
        {id: '3', name: '2️⃣learn Angular', isDone: true},
      ],
      '3': [
        {id: '1', name: '3️⃣learn something', isDone: false},
        {id: '2', name: '3️⃣learn Vue', isDone: false},
        {id: '3', name: '3️⃣learn Angular', isDone: true},
      ],
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    lists(state)  {
      return state.lists
    },
    taskAll:(state) => (todoId) => {
     return  state.tasks[todoId]
    },
    tasksIsDone: (state) => (todoId, status) => {
      return state.tasks[todoId].filter(s => s.isDone === status)
    }
  },
  modules: {
  },
})
