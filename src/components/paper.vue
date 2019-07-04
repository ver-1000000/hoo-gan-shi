<template>
  <g transform="translate(305, 0)">
    <rect class="bound" height="400" width="610"></rect>
    <g
      is="PaperLine"
      :characters="line"
      :index="i"
      :key="i"
      v-for="(line, i) in lines"
    >
    </g>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Char } from "../classes";
import PaperLine from "./paper-line.vue";

@Component({ components: { PaperLine } })
export default class Paper extends Vue {
  private lines: Char[][] = Array.from(Array(20), () => []);

  @Prop()
  private characters!: Char[];

  private get script() {
    return this.$store.state.script;
  }

  @Watch("characters")
  updateCharacters(newValue: Char[], oldValue: Char[]) {
    const dLine = (newValue[0] || {}).line || 0;
    this.lines = Array.from(Array(20), () => []);
    newValue.forEach(x => this.lines[x.line - dLine].push(x));
  }
}
</script>

<style scoped lang="scss">
output {
  display: block;
}

.bound {
  fill: none;
  stroke: #9b8;
  stroke-width: 0.6;
}
</style>
