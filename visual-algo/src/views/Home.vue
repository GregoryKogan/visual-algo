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
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
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
}

.home-page h2 {
  margin-bottom: 20px;
}

.home-page button {
  background-color: #bd93f9;
  margin-bottom: 20px;
  margin-top: 10px;
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
