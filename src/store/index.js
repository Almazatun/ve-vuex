import {createStore} from 'vuex'
import {
    ADD_NEW_LIST,
    ADD_TASK,
    CHANGE_TASK_STATUS,
    DELETE_LIST,
    DELETE_TASK,
    RENAME_LIST,
    RENAME_TASK_OF_THE_LIST
} from "../util/mutation";
import {addNewId, arrListId, deleteId, firstListId, secondListId, thirdListId} from "../util/arrListId";


export default createStore({
    state: {
        lists: [
            {id: firstListId, name: 'List 1'},
            {id: secondListId, name: 'List 2'},
            {id: thirdListId, name: 'List 3'},
        ]
        ,
        tasks: {
            [firstListId]: [
                {id: '1', name: '1️⃣', isDone: false},
                {id: '2', name: '1️⃣', isDone: true},
                {id: '3', name: '1️⃣', isDone: false},
            ],
            [secondListId]: [
                {id: '1', name: '2️⃣', isDone: false},
                {id: '2', name: '2️⃣', isDone: false},
                {id: '3', name: '2️⃣', isDone: true},
            ],
            [thirdListId]: [
                {id: '1', name: '3️', isDone: false},
                {id: '2', name: '3️⃣', isDone: false},
                {id: '3', name: '3️⃣', isDone: true},
            ],
        },
    },
    mutations: {
        [CHANGE_TASK_STATUS](state, payload) {
            state.tasks[payload.todoId] = state.tasks[payload.todoId]
                .map(t => t.id === payload.taskId ? {...t, isDone: !t.isDone} : t)
        },
        [DELETE_TASK](state, payload) {
            state.tasks[payload.todoId] = state.tasks[payload.todoId].filter(t => t.id !== payload.taskId)
        },
        [ADD_TASK](state, payload) {
            const newID = Math.floor(Math.random() * (Math.random() * 100) * 1000)
            const titleTodo = payload.title
            const newTask = {id: newID, name: titleTodo, isDone: false}
            state.tasks[payload.todoId] = [newTask, ...state.tasks[payload.todoId]]
        },
        [ADD_NEW_LIST](state, payload) {
            const {title} = payload
            addNewId()
            const listId = [arrListId.length - 1]
            console.log(listId)
            const newList = {id: arrListId[listId], name: title}
            state.lists = [newList, ...state.lists]
            state.tasks = {
                ...state.tasks,
                [arrListId[listId]]: []
            }
        },
        [DELETE_LIST](state, payload) {
            const {todoId} = payload
            const copyState = {...state.tasks}
            deleteId(todoId)
            // eslint-disable-next-line no-empty-pattern
            const { [todoId]:[] ,  ...rest} = copyState
            state.lists = state.lists.filter(l => l.id !== todoId)
            state.tasks = rest
        },
        [RENAME_LIST](state, payload){
            state.lists = state.lists.map(l => l.id === payload.todoId ? {...l, name: payload.title} : l)
        },
        [RENAME_TASK_OF_THE_LIST](state, payload){
            state.tasks[payload.todoId] = state.tasks[payload.todoId].map(t =>{
                return t.id !== payload.taskId ? t : {...t, name: payload.title}
            })
        }
    },
    actions: {
        changeStatusOfTask({commit}, payload) {
            commit(CHANGE_TASK_STATUS, payload)
        },
        deleteTask({commit}, payload) {
            commit(DELETE_TASK, payload)
        },
        addTask({commit}, payload) {
            commit(ADD_TASK, payload)
        },
        addList(context, payload) {
            context.commit(ADD_NEW_LIST, payload)
        },
        deleteList(context, payload) {
            context.commit(DELETE_LIST, payload)
        },
        renameList(context, payload){
            context.commit(RENAME_LIST, payload)
        },
        renameTaskOfTheList(context, payload){
            context.commit(RENAME_TASK_OF_THE_LIST, payload)
        }

    },
    getters: {
        lists(state) {
            return state.lists
        },
        tasks: (state) => (todoId) => {
            return state.tasks[todoId]
        },
        all: (state) => (todoId) => {
            return state.tasks[todoId]
        },
        isDone: (state) => (todoId) => {
            return state.tasks[todoId].filter(s => s.isDone)
        },
        inProgress: (state) => (todoId) => {
            return state.tasks[todoId].filter(s => !s.isDone)
        },
    },
    modules: {},
})
