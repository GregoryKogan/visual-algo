// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/BubbleSort",
    name: "BubbleSort",
    component: () => import("@/views/BubbleSort.vue"),
  },
  {
    path: "/SelectionSort",
    name: "SelectionSort",
    component: () => import("@/views/SelectionSort.vue"),
  },
  {
    path: "/InsertionSort",
    name: "InsertionSort",
    component: () => import("@/views/InsertionSort.vue"),
  },
  {
    path: "/BinaryInsertionSort",
    name: "BinaryInsertionSort",
    component: () => import("@/views/BinaryInsertionSort.vue"),
  },
  {
    path: "/PancakeSort",
    name: "PancakeSort",
    component: () => import("@/views/PancakeSort.vue"),
  },
  {
    path: "/MergeSort",
    name: "MergeSort",
    component: () => import("@/views/MergeSort.vue"),
  },
  {
    path: "/HeapSort",
    name: "HeapSort",
    component: () => import("@/views/HeapSort.vue"),
  },
  {
    path: "/ShellSort",
    name: "ShellSort",
    component: () => import("@/views/ShellSort.vue"),
  },
  {
    path: "/QuickSort",
    name: "QuickSort",
    component: () => import("@/views/QuickSort.vue"),
  },
  {
    path: "/RadixSort",
    name: "RadixSort",
    component: () => import("@/views/RadixSort.vue"),
  },
  {
    path: "/CountingSort",
    name: "CountingSort",
    component: () => import("@/views/CountingSort.vue"),
  },
  {
    path: "/DFS",
    name: "DFS",
    component: () => import("@/views/DFS.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
