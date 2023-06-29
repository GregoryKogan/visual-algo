<template>
  <v-btn color="#bd93f9" size="large" @click="this.$router.push(algoRoute)">{{
    algoName
  }}</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GoToAlgoButton",
  props: {
    algoName: String,
    algoRoute: String,
  },
});
</script>
