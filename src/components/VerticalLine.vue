<template>
  <g :transform="'translate(' + (600 - Math.floor(index * 30)) + ', 0)'">
    <path d="m-20 0v400" />
    <path d="m0 0v400" />
    <g
      is="Cell"
      class="cell"
      :index="index"
      :character="characters[index] || ''"
      :key="index"
      @textClick="textClick"
      v-for="(n, index) in 20"
    ></g>
  </g>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import Cell from "./Cell.vue";

@Component({ components: { Cell } })
export default class VerticalLine extends Vue {
  @Prop({ default: 0 }) private index!: number;
  @Prop({ default: "" }) private line!: string;
  characters: string[] = [];
  ligature = "";

  @Watch("line")
  private onLineChange(newLine: string, oldLine: string) {
    this.characters = Array.from(newLine);
    this.characters[
      Math.min(this.characters.length - 1, 19)
    ] += this.characters.splice(20, Infinity).join("");
  }

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
