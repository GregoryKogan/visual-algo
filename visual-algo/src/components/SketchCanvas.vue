<template>
  <canvas id="sketch" :width="width" :height="height"> </canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SketchCanvas",
  data: () => ({
    width: 1920,
    height: 1080,
  }),
});
</script>

<style>
#sketch {
  display: block;
  padding: 10px;
  border-radius: 10px;
  border: 3px dashed #bd93f9;
}
</style>
