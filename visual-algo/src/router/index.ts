import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import BubbleSort from "../views/BubbleSort.vue";
import SelectionSort from "../views/SelectionSort.vue";
import InsertionSort from "../views/InsertionSort.vue";
import BinaryInsertionSort from "../views/BinaryInsertionSort.vue";
import PancakeSort from "../views/PancakeSort.vue";
import MergeSort from "../views/MergeSort.vue";

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
  {
    path: "/MergeSort",
    name: "MergeSort",
    component: MergeSort,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
