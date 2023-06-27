<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
#app {
  color: #f8f8f2;
}

body {
  background-color: #282a36;
}

input[type="range"] {
  -webkit-appearance: none;
  margin-right: 15px;
  height: 5px;
  background: rgba(255, 255, 255, 0.6);
  background-color: #50fa7b;
  border-radius: 5px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 10px;
  width: 10px;
  border-radius: 100%;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
