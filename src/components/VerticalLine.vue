<template>
  <g :transform="'translate(' + (600 - Math.floor(index * 30)) + ', 0)'">
    <path d="m-20 0v400" />
    <path d="m0 0v400" />
    <g
      is="Cell"
      class="cell"
      :cell="cell"
      :key="index"
      :index="index"
      @textClick="textClick"
      v-for="(cell, index) in line.cells"
    ></g>
  </g>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import Cell from "./Cell.vue";

interface Line {
  cells: any[];
  internalCharLength: number;
}

@Component({ components: { Cell } })
export default class VerticalLine extends Vue {
  @Prop({ default: 0 }) private index!: number;
  @Prop() private line!: Line;

  @Emit("textClick")
  private textClick(value: any) {}
}
</script>

<style scoped lang="scss">
path {
  stroke: #9b8;
  stroke-width: 0.4;
}

text {
  writing-mode: tb;
}
</style>
