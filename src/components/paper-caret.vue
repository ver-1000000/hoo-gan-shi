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
    return this.$store.state.currentLine.index;
  }
  get cellIndex() {
    const { currentLine, selectionStart } = this.$store.state;
    return selectionStart - currentLine.beforeAllCharLength;
  }
  get transform() {
    const x = -30 * this.lineIndex;
    const y = 20 * this.cellIndex - Math.max(this.cellIndex - 20, 0) * 11;
    return `translate(${x}, ${y})`;
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
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
