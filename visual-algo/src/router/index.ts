import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import BubbleSort from "../views/BubbleSort.vue";
import SelectionSort from "../views/SelectionSort.vue";
import InsertionSort from "../views/InsertionSort.vue";
import BinaryInsertionSort from "../views/BinaryInsertionSort.vue";
import PancakeSort from "../views/PancakeSort.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
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
  {
    path: "/InsertionSort",
    name: "InsertionSort",
    component: InsertionSort,
  },
  {
    path: "/BinaryInsertionSort",
    name: "BinaryInsertionSort",
    component: BinaryInsertionSort,
  },
  {
    path: "/PancakeSort",
    name: "PancakeSort",
    component: PancakeSort,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
