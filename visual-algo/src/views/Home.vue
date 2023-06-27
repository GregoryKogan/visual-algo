<template>
  <div class="home-page">
    <h1>Visual Algo</h1>
    <h2>Sorting algorithms</h2>
    <v-row justify="space-around">
      <button v-on:click="$router.push('BubbleSort')">BubbleSort</button>
      <button v-on:click="$router.push('SelectionSort')">SelectionSort</button>
      <button v-on:click="$router.push('InsertionSort')">InsertionSort</button>
      <button v-on:click="$router.push('BinaryInsertionSort')">
        BinaryInsertionSort
      </button>
      <button v-on:click="$router.push('ShellSort')">ShellSort</button>
      <button v-on:click="$router.push('PancakeSort')">PancakeSort</button>
      <button v-on:click="$router.push('MergeSort')">MergeSort</button>
      <button v-on:click="$router.push('HeapSort')">HeapSort</button>
      <button v-on:click="$router.push('QuickSort')">QuickSort</button>
      <button v-on:click="$router.push('RadixSort')">RadixSort</button>
      <button v-on:click="$router.push('CountingSort')">CountingSort</button>
    </v-row>
    <div style="height: 30px"></div>
    <h2>Graph algorithms</h2>
    <v-row justify="space-around">
      <button v-on:click="$router.push('DFS')">DFS</button>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
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

.home-page button {
  background-color: #bd93f9;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 20px;
  border-radius: 10px;
}
</style>
