<template>
  <main>
    <svg height="440" width="650" viewBox="0 0 650 440">
      <rect class="bound" height="400" width="610" x="20" y="20"></rect>
      <g is="PaperCaret" class="caret"></g>
      <g transform="translate(20, 20)">
        <g
          is="PaperLine"
          class="line"
          :line="line"
          :key="index"
          :index="index"
          v-for="(line, index) in lines"
        ></g>
      </g>
    </svg>
    <PaperInput />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Line } from "../classes";
import PaperCaret from "./paper-caret.vue";
import PaperInput from "./paper-input.vue";
import PaperLine from "./paper-line.vue";

@Component({ components: { PaperCaret, PaperInput, PaperLine } })
export default class Paper extends Vue {
  private get lines() {
    return this.$store.state.script.lines;
  }
}
</script>

<style scoped lang="scss">
svg {
  border: 0.4px solid black;
  box-sizing: border-box;
  display: block;
  margin: 1rem auto;
}

.bound {
  fill: none;
  stroke: #9b8;
  stroke-width: 0.6;
}
</style>
