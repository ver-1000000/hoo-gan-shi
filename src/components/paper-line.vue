<template>
  <g :transform="'translate(' + -Math.floor(index * 30) + ', 0)'">
    <path d="m-20 0v400" />
    <path d="m0 0v400" />
    <g
      is="PaperLineCell"
      class="cell"
      :cell="cell"
      :key="i"
      :index="i"
      v-for="(cell, i) in line.cells"
    ></g>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Line } from "../classes";
import PaperLineCell from "./paper-line-cell.vue";

@Component({ components: { PaperLineCell } })
export default class PaperLine extends Vue {
  @Prop() private line!: Line;
  @Prop() private index!: number;
}
</script>

<style scoped lang="scss"></style>
