<template>
  <g :transform="'translate(' + (600 - Math.floor(index * 30)) + ', 0)'">
    <path d="m-20 0v400" />
    <path d="m0 0v400" />
    <g
      is="PaperLineCell"
      class="cell"
      :cell="cell"
      :key="index"
      :index="index"
      v-for="(cell, index) in line.cells"
    ></g>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Line } from "../classes";
import PaperLineCell from "./paper-line-cell.vue";

@Component({ components: { PaperLineCell } })
export default class PaperLine extends Vue {
  @Prop({ default: 0 }) private index!: number;
  @Prop() private line!: Line;
}
</script>

<style scoped lang="scss"></style>
