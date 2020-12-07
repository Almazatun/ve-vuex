<template>
  <div id="list">
    <h3>{{ idTodo }} | {{ titleTodo }}}</h3>
    <AddNewTask :callback="addNewTask"/>
    <TodoItems :items="tasks"
               :change-task-s="changeTaskStatus"
               :delete-task="deleteTask"
    />
    <div style="margin-top: 20px ">
      <button @click="getAll">all</button>
      <button @click="getInProgress">In progress</button>
      <button @click="getIsDone">Done</button>
    </div>
  </div>
</template>

<script>
import TodoItems from "./TodoItem";
import AddNewTask from "./AddNewTask"

import {watch} from 'vue'
import {ref} from 'vue'
import {useStore} from "vuex";
import {ALL, IN_PROGRESS, IS_DONE} from "../util/filter";
import {watcherData} from "../util/watcherData";

export default {
  name: "TodoList",
  components: {
    TodoItems: TodoItems,
    AddNewTask: AddNewTask
  },
  props: {
    titleTodo: {
      type: String,
      required: true
    },
    idTodo: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const sort = ref(ALL)
    const watchData = store.state.tasks
    const tasks = ref(store.getters.tasks(props.idTodo))

    function getAll() {
      sort.value = ALL
      tasks.value = store.getters.all(props.idTodo)
    }

    function getInProgress() {
      sort.value = IN_PROGRESS
      tasks.value = store.getters.inProgress(props.idTodo)
    }

    function getIsDone() {
      sort.value = IS_DONE
      tasks.value = store.getters.isDone(props.idTodo)
    }

    watch(watchData, () => {
      tasks.value = watcherData(sort, store, props)
      console.log("Watching")
    })

    return {
      tasks,
      getAll,
      getInProgress,
      getIsDone,
    }
  },


  methods: {
    changeTaskStatus(taskId) {
      const todoId = this.idTodo
      this.$store.dispatch({
        type: 'changeStatusOfTask',
        todoId: todoId,
        taskId: taskId
      });
    },
    deleteTask(taskId) {
      const todoId = this.idTodo
      this.$store.dispatch({
        type: 'deleteTask',
        todoId: todoId,
        taskId: taskId
      })
    },
    addNewTask(title){
      const todoId = this.idTodo
      this.$store.dispatch({
        type: 'addTask',
        todoId: todoId,
        title: title
      })
    }
  },
}
</script>

<style scoped>

#list {
  border: 1px solid palevioletred;
  width: 200px;
  min-height: 200px;
}

</style>