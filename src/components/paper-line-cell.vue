<template>
  <g :transform="transform" @click="click">
    <rect fill="#fff" fill-opacity="0" height="20" width="20" />
    <path d="m0 0h20" v-if="index !== 0" />
    <text x="10" dy="0,-5,-10">
      {{ cell.char
      }}<template v-for="char in cell.combineChars">{{ char.char }}</template>
    </text>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Cell } from "../classes";

@Component({})
export default class PaperLineCell extends Vue {
  @Prop() private index!: number;
  @Prop() private cell!: Cell;

  get transform() {
    return `translate(-20, ${Math.floor(this.index * 20)})`;
  }

  click(e: MouseEvent) {
    const line = this.cell.parent;
    const selectionStart =
      (this.cell.char ? this.cell.index : line.internalCharLength - 1) +
      line.beforeAllCharLength;
    this.$store.dispatch("moveTo", selectionStart);
  }
}
</script>

<style scoped lang="scss">
text {
  fill: #1c1c1d;
  writing-mode: tb;
}
</style>
