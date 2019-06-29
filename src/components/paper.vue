<template>
  <article>
    <svg height="440" width="650" viewBox="0 0 650 440">
      <rect class="bound" height="400" width="610" x="20" y="20"></rect>
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
    <textarea
      class="input-area"
      cols="100"
      rows="32"
      v-model="script"
      @input="input"
    >
    </textarea>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Line } from "../classes";
import PaperLine from "./paper-line.vue";

interface InputEvent {
  target: { value: string };
}

@Component({ components: { PaperLine } })
export default class Paper extends Vue {
  private get script(): string {
    return this.$store.state.script.raw;
  }

  private set script(text: string) {
    this.$store.commit("rewite", text);
  }

  private get lines() {
    return this.$store.state.script.lines;
  }

  private input(event: InputEvent) {
    this.script = event.target.value;
  }
}
</script>

<style scoped lang="scss">
svg {
  border: 0.4px solid black;
}

.bound {
  fill: none;
  stroke: #9b8;
  stroke-width: 0.6;
}
</style>
