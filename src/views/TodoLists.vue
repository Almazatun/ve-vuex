<template>
  <div>
    <label>
      <input class="listInput" v-model="title"/>
    </label>
    <button @click="addNewList">Add new list</button>
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
    const title = ref('')

    return {
      data,
      title
    }
  },
  methods: {
    addNewList() {
      if (this.title.trim() !== '') {
        this.$store.dispatch({
          type: 'addList',
          title: this.title,
        });
        this.title = ''
      } else {
        alert('Bad action')
      }
    },
  }
}
</script>

<style scoped>
#container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 200px);
  grid-gap: 5px;
}

#container {
  width: 80%;
  margin: auto;
  justify-content: center;
  min-height: 100vh;
}

</style>