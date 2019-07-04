<template>
  <g
    transform="translate(885, 0)"
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
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class PaperCaret extends Vue {
  noAnimate = false;
  get caret() {
    return this.$store.state.caret;
  }
  get transform() {
    return `translate(${this.caret.x}, ${this.caret.y})`;
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
