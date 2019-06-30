<template>
  <g transform="translate(600, 21)">
    <path d="m-1 0h22" :transform="transform" />
  </g>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class PaperCaret extends Vue {
  get lineIndex() {
    return this.$store.state.currentCell.parent.index;
  }
  get cellIndex() {
    return this.$store.state.currentCell.index;
  }
  get transform() {
    return `translate(${-30 * this.lineIndex}, ${20 * this.cellIndex})`;
  }
}
</script>

<style scoped lang="scss">
path {
  animation: flash 1s steps(2) infinite;
  stroke: #444;
  stroke-width: 2;
}

@keyframes flash {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
