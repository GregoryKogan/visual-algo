import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import BubbleSort from "../views/BubbleSort.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "BubbleSort",
    component: BubbleSort,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
