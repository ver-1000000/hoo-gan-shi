<template>
  <g :transform="'translate(-20, ' + Math.floor(index * 20) + ')'">
    <path d="m0 0h20" />
    <text ref="text" x="10" dy="0,-5,-10" @click="click">
      {{ cell.char }}
    </text>
  </g>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Cell extends Vue {
  @Prop({ default: 0 }) private index!: number;
  @Prop() private cell!: any;

  @Emit("textClick")
  private clickEmit(value: any) {}

  private click = (e: MouseEventInit) => this.clickEmit(this.index);
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
