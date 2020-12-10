<template>
  <div class="container_top">
    <button class="btn_add_new_list" @click="addNewList">Add list</button>
  </div>
  <div id="container">
    <div v-for="listsData in data.lists" :key="listsData.id" class="content">
      <Todolist :title-todo="listsData.name"
                :id-todo="listsData.id"
      />
    </div>
  </div>


</template>

<script>
import {ref} from 'vue'
import Todolist from "../components/TodoList";
import {useStore} from "vuex";

export default {
  name: "TodoLists",
  components: {
    Todolist: Todolist
  },
  setup() {
    const store = useStore();
    const data = ref(store.state);

    return {
      data
    }
  },
  methods: {
    addNewList() {
      const title = prompt(`Please enter name of new list`, '')
      if (title && title.trim() !== '') {
        this.$store.dispatch({
          type: 'addList',
          title: title,
        });
      } else if (title === null) {
        alert('It is up to you')
      } else {
        alert('Field should be required')
      }
    },
  }
}
</script>

<style lang="scss" scoped>

.container_top {
  width: 80%;
  margin: 20px auto;
  box-sizing: border-box;
  display: flex;

  .btn_add_new_list {
    @include BtnAddList($addNewListBtn);
  }
}

#container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 400px);
  grid-gap: 10px;
}

#container {
  width: 80%;
  margin: auto;
  justify-content: space-between;
}

@include Media1600();
@include Media1050();
@include Media550();
</style>