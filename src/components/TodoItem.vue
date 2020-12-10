<template>
    <transition-group name="items" tag="div"
                      class="container_tasks"
    >
      <div v-for="(task) in items" v-bind:key="task.id" class="task_child">
        <label>
          <input type="checkbox"
                 :checked="task.isDone"
                 @input="changeTaskS(task.id)"
          />
          <span :style="titleTaskStyle(task.isDone)">{{ task.name }}</span>
        </label>
        <div class="task_child_bottom_btns">
          <button @click="renameTask(todoId ,task.id)">rename</button>
          <button @click="deleteTask(task.id)">❌</button>
        </div>
      </div>
    </transition-group>
</template>

<script>
export default {
  name: "TodoItem",
  props: ['items', 'changeTaskS', 'deleteTask', 'todoId'],
  methods: {
    renameTask(todoId, tasId) {
      const title = prompt(`Please enter new name of the task`, '')
      if (title.trim() !== '') {
        this.$store.dispatch({
          type: 'renameTaskOfTheList',
          todoId: todoId,
          taskId: tasId,
          title: title
        })
      } else {
        alert('Field should be required 🤬')
      }
    },
    titleTaskStyle(status) {
      return {
        textDecoration: status ? 'line-through' : ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
/*Css Transition group | VUE*/
.items-task {
  display: inline-block;
  margin-right: 10px;
}

.items-enter-active,
.items-leave-active {
  transition: all 1s ease;
}

.items-enter-from,
.items-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/*--------------------------*/

.container_tasks {
  margin: auto;
  width: 70%;
  min-height: 80px;
  font-weight: 700;

  .task_child {
    margin: 0 0 8px 0;
    display: flex;
    flex-direction: row;
    label {
      min-width: 150px;
      max-width: 150px;
      display: flex;
      flex-direction: row;
      margin: auto;
      input {
        margin: 3px 10px 0 0 ;
      }
      span {
        max-width: 80%;
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
      }
    }
  ;

    .task_child_bottom_btns {
      button {
        margin: 0 5px;
        padding: 4px;
        border: 0 solid;
        border-radius: 4px;
        outline: 0 solid;
        font-weight: 700;
      }
    }
  }
}
@media (max-width: 550px) {
  .container_tasks {
    margin: auto;
    width: 100%;
  }
}

</style>