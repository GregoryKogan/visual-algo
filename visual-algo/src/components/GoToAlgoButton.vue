<template>
  <v-btn color="#bd93f9" size="large" @click="$router.push(route)">{{
    name
  }}</v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GoToAlgoButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
  },
});
</script>
