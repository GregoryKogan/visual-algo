<template>
  <h2>{{ name }}</h2>
  <v-row justify="space-around">
    <div v-for="algo in algos" style="margin: 0.5em">
      <GoToAlgoButton :algoName="algo.name" :algoRoute="algo.route" />
    </div>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GoToAlgoButton from "@/components/GoToAlgoButton.vue";

export default defineComponent({
  name: "AlgoGroup",
  components: {
    GoToAlgoButton,
  },
  props: {
    name: String,
    algos: Array<{
      name: String;
      route: String;
    }>,
  },
});
</script>
