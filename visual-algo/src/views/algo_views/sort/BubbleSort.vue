<template>
  <div class="sort-page">
    <h1 style="margin-top: 20px">
      <a href="https://en.wikipedia.org/wiki/Bubble_sort">Bubble Sort</a>
    </h1>
    <h3>Time complexity O(n²)</h3>
    <h3 style="margin-bottom: 20px">Space complexity O(1)</h3>
    <div class="stats">
      <v-col>
        <span>{{ sketch.compsCounter }} comparisons</span>
        <v-spacer></v-spacer>
        <span v-if="sketch.values">N: {{ sketch.values.length }}</span>
        <v-spacer></v-spacer>
        <span>Steps per second: {{ stepsPerSecond }}</span>
      </v-col>
    </div>
    <SketchCanvas style="width: 100%" />
    <div class="controls">
      <v-col>
        <button v-on:click="sketch.setup({ n: n, stepsPerSecond: stepsPerSecond })">
          START
        </button>
        <v-spacer></v-spacer>
        <span style="font-size: large">N: {{ n }}</span>
        <v-spacer></v-spacer>
        <v-slider v-model="n" min="10" max="2000" step="10" color="#50fa7b" thumb-color="#f8f8f2"></v-slider>
        <span style="font-size: large">Steps per second: {{ stepsPerSecond }}</span>
        <v-spacer></v-spacer>
        <v-slider v-model="stepsPerSecond" min="100" max="1000000" step="100" color="#50fa7b"
          thumb-color="#f8f8f2"></v-slider>
      </v-col>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BubbleSortSketch } from "@/algos/BubbleSort";
import { Painter } from "@/utilities/painter";
import SketchCanvas from "@/components/SketchCanvas.vue";

export default defineComponent({
  name: "BubbleSort",
  components: {
    SketchCanvas,
  },
  data: () => ({
    sketch: {} as BubbleSortSketch,
    n: 100,
    stepsPerSecond: 100,
  }),
  mounted() {
    const canvas = document.getElementById("sketch");
    if (canvas && Painter.isCanvas(canvas)) {
      this.sketch = new BubbleSortSketch(canvas);
      this.sketch.setup();
    }
  },
});
</script>

<style>
.sort-page {
  width: max(350px, min(90vw, 1300px));
  margin-left: auto;
  margin-right: auto;
}

.sort-page h1 a {
  color: #ff79c6;
  text-decoration: none;
}

.sort-page h1 a:hover {
  text-decoration: underline;
}

.sort-page h1 a:active {
  color: #8be9fd;
  text-decoration: underline;
}

#sketch {
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  border-radius: 10px;
  border: 3px dashed #bd93f9;
}

.controls button {
  background-color: #ff79c6;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 10px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 17px;
  border-radius: 10px;
}
</style>
