<template>
  <main>
    <svg viewBox="0 0 1300 440">
      <rect class="bound" height="400" width="610" x="970" y="20"></rect>
      <g transform="translate(1570, 20)">
        <g
          is="PaperLine"
          class="line"
          :line="line"
          :key="i"
          :index="i"
          v-for="(line, i) in rightPaperLines"
        ></g>
      </g>
      <g is="PaperCaret" class="caret"></g>
      <rect class="bound" height="400" width="610" x="345" y="20"></rect>
      <g transform="translate(945, 20)">
        <g
          is="PaperLine"
          class="line"
          :line="line"
          :key="i"
          :index="i"
          v-for="(line, i) in centerPaperLines"
        ></g>
      </g>
      <g is="PaperCaret" class="caret"></g>
      <rect class="bound" height="400" width="610" x="-280" y="20"></rect>
      <g transform="translate(320, 20)">
        <g
          is="PaperLine"
          class="line"
          :line="line"
          :key="i"
          :index="i"
          v-for="(line, i) in leftPaperLines"
        ></g>
      </g>
      <g is="PaperCaret" class="caret"></g>
    </svg>
    <output>{{ charaLength }}</output>
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
  private get rightPaperLines() {
    return this.$store.state.script.lines.slice(0, 20);
  }
  private get centerPaperLines() {
    return this.$store.state.script.lines.slice(20, 40);
  }
  private get leftPaperLines() {
    return this.$store.state.script.lines.slice(40, 60);
  }
  private get charaLength() {
    return [...this.$store.state.script.raw].length;
  }
}
</script>

<style scoped lang="scss">
svg {
  border: 0.4px solid black;
  box-sizing: border-box;
  display: block;
  width: 100%;
}

output {
  display: block;
}

.bound {
  fill: none;
  stroke: #9b8;
  stroke-width: 0.6;
}
</style>
