<template>
  <g
    class="caret"
    v-show="caret.visibled"
    :class="{ 'no-animate': noAnimate }"
    @transitionstart="noAnimate = true"
    @transitionend="noAnimate = false"
  >
    <g :transform="transform">
      <path d="m-1 -4v8" />
      <path d="m21 -4v8" />
      <path d="m-1 0h22" />
    </g>
  </g>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class PaperCaret extends Vue {
  noAnimate = false;

  get caret() {
    return this.$store.state.caret;
  }

  get transform() {
    return `translate(${this.caret.x}, ${this.caret.y})`;
  }

  @Watch("caret.selectionStart")
  onSelectionStartChange(newValue: number, oldValue: number) {
    this.noAnimate = true;
    requestAnimationFrame(() => (this.noAnimate = false));
  }
}
</script>

<style scoped lang="scss">
.caret {
  animation: flash 1s 1s steps(1) infinite;
}

.caret.no-animate {
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
