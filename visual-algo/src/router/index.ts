import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import BubbleSort from "../views/BubbleSort.vue";
import SelectionSort from "../views/SelectionSort.vue";
import InsertionSort from "../views/InsertionSort.vue";
import BinaryInsertionSort from "../views/BinaryInsertionSort.vue";
import PancakeSort from "../views/PancakeSort.vue";
import MergeSort from "../views/MergeSort.vue";
import HeapSort from "../views/HeapSort.vue";
import ShellSort from "../views/ShellSort.vue";
import QuickSort from "../views/QuickSort.vue";
import RadixSort from "../views/RadixSort.vue";
import CountingSort from "../views/CountingSort.vue";

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
  {
    path: "/HeapSort",
    name: "HeapSort",
    component: HeapSort,
  },
  {
    path: "/ShellSort",
    name: "ShellSort",
    component: ShellSort,
  },
  {
    path: "/QuickSort",
    name: "QuickSort",
    component: QuickSort,
  },
  {
    path: "/RadixSort",
    name: "RadixSort",
    component: RadixSort,
  },
  {
    path: "/CountingSort",
    name: "CountingSort",
    component: CountingSort,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
