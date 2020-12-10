<template>
  <div class="add_new_task">
    <label>
      <input type="text" v-model="title" @keyup.enter="addTask"/>
    </label>
    <button class="add_new_task_btn" @click="addTask">Add task</button>
  </div>
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

<style lang="scss" scoped>
.add_new_task {
  margin: 10px;
  .add_new_task_btn {
    margin: 5px;
    border: 0 solid;
    padding: 10px 10px;
    border-radius: 4px;
    outline: 0 solid;
    background: $addNewListBtn;
    font-weight: 700;
    &:hover {
      @include transition();
      background: #a3e2c2;
    }
  };
  label {
    width: 80%;
    input {
      width: 70%;
      border: 1px solid #e2d8d8;
      border-radius: 4px;
      height: 2rem;
      &:focus {
        background: #eff0f5;
        outline-color: #ced0f4;
      }
    }
  }
}

</style>