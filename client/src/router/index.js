import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Historique from "../views/Historique.vue";
import Login from "../views/Login";

Vue.use(VueRouter);

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

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
