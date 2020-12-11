<template>
  <div id="content_list">
    <div class="content_list_top">
      <button class="list_top_rename_btn" @click="renameList">Rename list</button>
      <button class="list_top_delete_btn" @click="deleteList">❌</button>
    </div>
    <div id="list">
      <h3>{{ titleTodo }}</h3>
      <AddNewTask :callback="addNewTask"/>
      <TodoItems :items="tasks"
                 :change-task-s="changeTaskStatus"
                 :delete-task="deleteTask"
                 :todo-id="idTodo"
      />
      <div class="content_list_bottom">
        <div>
          <button class="content_list_bottom_btn" :style="activeAllBtn" @click="getAll">All</button>
          <button class="content_list_bottom_btn" :style="activeInProgressBtn" @click="getInProgress">In Progress
          </button>
          <button class="content_list_bottom_btn" :style="activeDoneBtn" @click="getIsDone">Done</button>
        </div>
        <div v-if="tasks.some(t => t.isDone)">
          <button @click="clearCompleted" class="content_list_bottom_btn">Clear completed</button>
        </div>
      </div>
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

const {CLEAR_COMPLETED} = require("../util/mutation");

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
    const watchData = store.state
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
      watcherData(sort, store, props, tasks)
    })

    return {
      tasks,
      getAll,
      getInProgress,
      getIsDone,
      sort,
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
    addNewTask(title) {
      const todoId = this.idTodo
      this.$store.dispatch({
        type: 'addTask',
        todoId: todoId,
        title: title
      })
    },
    deleteList() {
      const todoId = this.idTodo
      this.$store.dispatch({
        type: 'deleteList',
        todoId: todoId
      })
    }, renameList() {
      const title = prompt(`Please enter new name of the list`, '')
      const todoId = this.idTodo
      if (title.trim() !== '') {
        this.$store.dispatch({
          type: 'renameList',
          todoId: todoId,
          title: title
        })
      } else {
        alert('Field should be required 🤬')
      }
    },
    clearCompleted() {
      this.$store.commit(CLEAR_COMPLETED, {todoId: this.idTodo})
    }
  },
  computed: {
    activeAllBtn() {
      return {
        background: this.sort === ALL ? 'pink' : ''
      }
    },
    activeInProgressBtn() {
      return {
        background: this.sort === IN_PROGRESS ? 'plum' : ''
      }
    },
    activeDoneBtn() {
      return {
        background: this.sort === IS_DONE ? '#42b983' : ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$fontWeight: 700;

#content_list {
  display: flex;
  flex-direction: column;
  border: 1px solid $listBorderColor;
  border-radius: 6px;
  padding: 10px;

  .content_list_top {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .list_top_rename_btn {
      margin: 5px;
      border: 0 solid;
      padding: 10px 10px;
      border-radius: 4px;
      outline: 0 solid;
      font-weight: $fontWeight;
    };
    .list_top_delete_btn {
      @include listTopBtns(#e99292);
      font-weight: $fontWeight;
    };
  }

  .content_list_bottom {
    margin: 20px 0 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .content_list_bottom_btn {
      margin: 5px;
      border: 0 solid;
      padding: 10px 10px;
      border-radius: 4px;
      outline: 0 solid;
      font-weight: $fontWeight;
    }
  }



  #list {
    min-height: 250px;
    h3 {
      font-family: sans-serif;
      text-transform: uppercase;
    }
  }

}

</style>