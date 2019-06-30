<template>
  <g
    :transform="'translate(-20, ' + Math.floor(index * 20) + ')'"
    @click="click"
  >
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
  @Prop({ default: 0 }) private index!: number;
  @Prop() private cell!: Cell;

  click(e: MouseEvent) {
    this.$store.dispatch(
      "selectionStart",
      this.cell.index + this.cell.parent.beforeAllCharLength
    );
    this.$store.dispatch("currentCell", this.cell);
  }
}
</script>

<style scoped lang="scss">
text {
  writing-mode: tb;
}
</style>
