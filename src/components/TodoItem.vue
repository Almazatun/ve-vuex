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
    </div>
  </div>
</template>

<script>


export default {
  name: "TodoItem",
  props: ['items', 'changeTaskS', 'deleteTask'],
  setup() {

    return {

    }
  },
}
</script>

<style scoped>


</style>