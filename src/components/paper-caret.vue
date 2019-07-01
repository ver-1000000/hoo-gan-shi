<template>
  <g
    transform="translate(600, 21)"
    v-show="caretVisibled"
    :class="{ 'no-animate': noAnimate }"
    @transitionstart="noAnimate = true"
    @transitionend="noAnimate = false"
  >
    <path d="m-1 -4v8" :transform="transform" />
    <path d="m21 -4v8" :transform="transform" />
    <path d="m-1 0h22" :transform="transform" />
  </g>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class PaperCaret extends Vue {
  noAnimate = false;
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
  get caretVisibled() {
    return this.$store.state.caretVisibled;
  }
}
</script>

<style scoped lang="scss">
g {
  animation: flash 1s 0.3s steps(1) infinite;
}

.no-animate {
  animation: none;
}

path {
  stroke: #444;
  stroke-width: 2;
  transition: transform 50ms linear;
}

@keyframes flash {
  0% {
    opacity: 0.1;
  }
  10% {
    opacity: 1;
  }
}
</style>
