import { createRouter, createWebHistory } from "vue-router";
import home from "./components/Home.vue";
import responce from "./components/responce.vue";

const routes = [
  { path: "/", component: home },
  { path: "/resonce", component: responce, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
