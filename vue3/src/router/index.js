import Home from "../views/Home.vue";
import Historique from "../views/Historique.vue";
import Login from "../views/Login";

import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/historique",
    name: "Historique",
    component: Historique,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
