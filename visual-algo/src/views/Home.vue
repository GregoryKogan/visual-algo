<template>
  <div class="home-page">
    <h1>Visual Algo</h1>
    <AlgoGroup name="Sorting algorithms" :algos="[
      { name: 'Bubble sort', route: 'BubbleSort' },
      { name: 'Selection sort', route: 'SelectionSort' },
      { name: 'Insertion sort', route: 'InsertionSort' },
      { name: 'Binary insertion sort', route: 'BinaryInsertionSort' },
      { name: 'Shell sort', route: 'ShellSort' },
      { name: 'Pancake sort', route: 'PancakeSort' },
      { name: 'Merge sort', route: 'MergeSort' },
      { name: 'Heap sort', route: 'HeapSort' },
      { name: 'Quick sort', route: 'QuickSort' },
      { name: 'Radix sort', route: 'RadixSort' },
      { name: 'Counting sort', route: 'CountingSort' },
    ]" />
    <div style="height: 30px"></div>
    <AlgoGroup name="Graph algorithms" :algos="[{ name: 'DFS', route: 'DFS' }]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GoToAlgoButton from "@/components/GoToAlgoButton.vue";
import AlgoGroup from "@/components/AlgoGroup.vue";

export default defineComponent({
  name: "Home",
  components: {
    GoToAlgoButton,
    AlgoGroup,
  },
  data: () => ({}),
});
</script>

<style>
.home-page {
  display: block;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.home-page h1 {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 10px;
}

.home-page h2 {
  margin-bottom: 20px;
}
</style>
