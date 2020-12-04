<template>
  <div id="list">
    <h3>{{ idTodo }} | {{ titleTodo }}}</h3>
    <TodoItems :items="tasks"/>
    <div style="margin-top: 20px ">
      <button @click="getAll">all</button>
      <button @click="getInProgressItems">In progress</button>
      <button @click="getDoneItems">Done</button>
    </div>

  </div>
</template>

<script>
import TodoItems from "@/components/TodoItem";
import {useStore} from "vuex";
import {ref} from 'vue'

export default {
  name: "TodoList",
  components: {
    TodoItems: TodoItems
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
  setup(props){
    const store = useStore();
    const tasks = ref(store.getters.taskAll(props.idTodo))

    function getDoneItems (){
      tasks.value = store.getters.tasksIsDone(props.idTodo, true)
    }
    function getAll(){
      tasks.value = store.getters.taskAll(props.idTodo)
    }
    function getInProgressItems(){
      tasks.value = store.getters.tasksIsDone(props.idTodo, false)
    }

    return {
      tasks,
      getDoneItems,
      getInProgressItems,
      getAll
    }
  }
}
</script>

<style scoped>

#list {
  border: 1px solid palevioletred;
  width: 200px;
  min-height: 200px;
}

</style>