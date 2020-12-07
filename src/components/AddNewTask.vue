<template>
  <label>
    <input type="text" v-model="title"/>
  </label>
  <button @click="addTask">Add task</button>
</template>

<script>
import {ref} from 'vue'

export default {
  name: "AddNewTask",
  props: {
    callback: {
      type: Function
    },
  },
  setup(props) {
    const title = ref('')

    function addTask() {
      if(title.value.trim() !== '') {
        props.callback(title.value)
        title.value = ''
      } else {
        alert('Please🤬 type name of new task')
      }
    }

    return {
      title,
      addTask
    }
  }
}
</script>

<style scoped>

</style>