// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/BubbleSort",
    name: "BubbleSort",
    component: () => import("@/views/algo_views/sort/BubbleSort.vue"),
  },
  {
    path: "/SelectionSort",
    name: "SelectionSort",
    component: () => import("@/views/algo_views/sort/SelectionSort.vue"),
  },
  {
    path: "/InsertionSort",
    name: "InsertionSort",
    component: () => import("@/views/algo_views/sort/InsertionSort.vue"),
  },
  {
    path: "/BinaryInsertionSort",
    name: "BinaryInsertionSort",
    component: () => import("@/views/algo_views/sort/BinaryInsertionSort.vue"),
  },
  {
    path: "/PancakeSort",
    name: "PancakeSort",
    component: () => import("@/views/algo_views/sort/PancakeSort.vue"),
  },
  {
    path: "/MergeSort",
    name: "MergeSort",
    component: () => import("@/views/algo_views/sort/MergeSort.vue"),
  },
  {
    path: "/HeapSort",
    name: "HeapSort",
    component: () => import("@/views/algo_views/sort/HeapSort.vue"),
  },
  {
    path: "/ShellSort",
    name: "ShellSort",
    component: () => import("@/views/algo_views/sort/ShellSort.vue"),
  },
  {
    path: "/QuickSort",
    name: "QuickSort",
    component: () => import("@/views/algo_views/sort/QuickSort.vue"),
  },
  {
    path: "/RadixSort",
    name: "RadixSort",
    component: () => import("@/views/algo_views/sort/RadixSort.vue"),
  },
  {
    path: "/CountingSort",
    name: "CountingSort",
    component: () => import("@/views/algo_views/sort/CountingSort.vue"),
  },
  {
    path: "/DFS",
    name: "DFS",
    component: () => import("@/views/algo_views/graph/DFS.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
