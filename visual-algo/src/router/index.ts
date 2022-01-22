import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import BubbleSort from "../views/BubbleSort.vue";
import SelectionSort from "../views/SelectionSort.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/BubbleSort",
    name: "BubbleSort",
    component: BubbleSort,
  },
  {
    path: "/SelectionSort",
    name: "SelectionSort",
    component: SelectionSort,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
