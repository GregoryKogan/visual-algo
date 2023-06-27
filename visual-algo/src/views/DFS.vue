<template>
  <div class="sort-page">
    <h1 style="margin-top: 20px">
      <a href="https://en.wikipedia.org/wiki/Depth-first_search"
        >Depth First Search</a
      >
    </h1>
    <h3>Time complexity O(|V| + |E|)</h3>
    <h3 style="margin-bottom: 20px">Space complexity O(|V|)</h3>
    <div class="stats">
      <v-col>
        <span>{{ sketch.visitedCounter }} visited</span>
      </v-col>
    </div>
    <canvas id="sketch" :width="canvasWidth" :height="canvasHeight"> </canvas>
    <div class="controls">
      <v-col>
        <button v-on:click="sketch.setup({ n: n })">START</button>
        <v-spacer></v-spacer>
        <span style="font-size: large">N: {{ n }}</span>
        <v-spacer></v-spacer>
        <input
          style="width: min(100%, 800px)"
          v-model="n"
          type="range"
          min="10"
          max="500"
          step="1"
        />
      </v-col>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DFSSketch } from "../algos/DFS";
import { Painter } from "../utilities/painter";

export default defineComponent({
  name: "DFS",
  data: () => ({
    canvasWidth: 2000,
    canvasHeight: 1125,
    sketch: {} as DFSSketch,
    n: 100,
  }),
  mounted() {
    const canvas = document.getElementById("sketch");
    if (canvas && Painter.isCanvas(canvas)) {
      this.sketch = new DFSSketch(canvas);
      this.sketch.setup({ n: this.n });
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
