<template>
  <g :transform="'translate(' + (600 - index * 30) + ', 0)'">
    <path d="m-20 0v400" />
    <path d="m0 0v400" />
    <g
      class="char"
      :transform="'translate(-20, ' + i * 20 + ')'"
      :key="char.id"
      @click="moveTo(char)"
      v-for="(char, i) in characters"
    >
      <rect fill-opacity="0" width="20" height="20"></rect>
      <text x="10">{{ char.value }}</text>
    </g>
    <g :key="i" v-for="(n, i) in 19">
      <path :d="'m-20 ' + n * 20 + 'h20'" />
    </g>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Char } from "../classes";

@Component({})
export default class PaperLine extends Vue {
  @Prop() private characters!: Char[];
  @Prop() private index!: number;

  private moveTo(char: Char) {
    this.$store.dispatch("moveTo", char);
  }
}
</script>

<style scoped lang="scss">
text {
  fill: #1c1c1d;
  writing-mode: tb;
}
</style>
