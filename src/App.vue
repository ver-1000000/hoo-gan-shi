<template>
  <Paper />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Paper from "./components/paper.vue";

@Component({ components: { Paper } })
export default class App extends Vue {}
</script>

<style lang="scss">
@import "https://fonts.googleapis.com/css?family=Sawarabi+Mincho";
@import "https://fonts.googleapis.com/earlyaccess/kokoro.css";
@import "https://fonts.googleapis.com/earlyaccess/hannari.css";
@import "https://fonts.googleapis.com/css?family=Merriweather&display=swap";

:root {
  color: #1c1c1d;
  font: 20px "游明朝", "Merriweather", "Sawarabi Mincho", "Kokoro", "Hannari"; // さわらび明朝にバグあり
  text-align: center;
}

body {
  margin: 0;
}

path {
  stroke: #9b8;
  stroke-width: 0.4;
}
</style>
