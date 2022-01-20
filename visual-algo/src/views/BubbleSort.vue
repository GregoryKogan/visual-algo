<template>
  <div id="bubble-sort-page">
    <h2>Bubble Sort</h2>
    <canvas id="sketch" :width="canvasWidth" :height="canvasHeight"> </canvas>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { sketchInit } from "../algos/BubbleSort";
import { isCanvas } from "../utilities/painter";

export default Vue.extend({
  name: "BubbleSort",
  data: () => ({
    canvasWidth: window.innerWidth,
    canvasHeight: window.innerHeight - 100,
  }),
  mounted() {
    const canvas = document.getElementById("sketch");
    if (canvas && isCanvas(canvas)) sketchInit(canvas);
  },
});
</script>

<style></style>
