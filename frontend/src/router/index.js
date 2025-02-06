import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import GestaoAdmin from "../views/GestaoAdmin.vue";

const routes = [
  { 
    path: "/", 
    component: HomePage 
  },

  {
    path: "/gestao-admin",
    component: GestaoAdmin
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
