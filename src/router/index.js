import {createRouter, createWebHashHistory} from 'vue-router'
import TodoLists from "../views/TodoLists";

const PATH = {
  home: '/',
  about: '/about',
  todoLists: '/todolists'
}

const routes = [
  {
    path: PATH.home,
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: PATH.todoLists,
    name: 'Todolists',
    component: TodoLists
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
