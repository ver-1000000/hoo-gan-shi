<template>
  <g :transform="'translate(-20, ' + Math.floor(index * 20) + ')'">
    <path d="m0 0h20" />
    <text ref="text" x="10" dy="0,-5,-10">
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
}
</script>

<style scoped lang="scss">
text {
  writing-mode: tb;
}
</style>
