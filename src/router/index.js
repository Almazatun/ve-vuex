import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Todolists  from "@/views/TodoLists";

const PATH = {
  home: '/',
  about: '/about',
  todoLists: '/todolists'
}

const routes = [
  {
    path: PATH.home,
    name: 'Home',
    component: Home
  },
  {
    path: PATH.about,
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: PATH.todoLists,
    name: 'Todolists',
    component: Todolists
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
