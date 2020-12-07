<template>
  <div>
    <div v-for="(task) in items.map(t => t)" v-bind:key="task.id" id="#items">
      <input type="checkbox"
             :checked="task.isDone"
             @input="changeTaskS(task.id)"

      />
      <span>{{task.name}}</span>
      <span>{{task.isDone}}</span>
      <button @click="deleteTask(task.id)">{{"💥"}}</button>
      <button @click="renameTask(todoId ,task.id)">rename task</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ['items', 'changeTaskS', 'deleteTask', 'todoId'],
  methods: {
    renameTask(todoId, tasId){
      const title = prompt(`Please enter type new name`, '')
      if (title.trim() !== '') {
        this.$store.dispatch({
          type: 'renameTaskOfTheList',
          todoId: todoId,
          taskId: tasId,
          title: title
        })
      } else {
        alert ('Field should be required 🤬')
      }
    }
  }
}
</script>

<style scoped>


</style>