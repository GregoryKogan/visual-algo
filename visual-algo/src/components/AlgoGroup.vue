<template>
  <h2>{{ name }}</h2>
  <div style="padding: 1em">
    <v-row justify="space-around">
      <div v-for="algo in algos" style="margin: 0.5em">
        <GoToAlgoButton :name="algo.name" :route="algo.route" />
      </div>
    </v-row>
  </div>
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
    name: {
      type: String,
      required: true,
    },
    algos: {
      type: Array<{
        name: string;
        route: string;
      }>,
      required: true,
    },
  },
});
</script>
