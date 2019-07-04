<template>
  <main>
    <PaperInput />
    <svg viewBox="0 0 1200 460" tabindex="-1">
      <g transform="translate(0, 30)" :key="i" v-for="(page, i) in pages">
        <image
          xlink:href="~@/assets/paper-texture.png"
          width="640"
          height="430"
          preserveAspectRatio="none"
          y="-15"
          :x="945 - i * 655"
        />
        <g
          class="right"
          is="Paper"
          :transform="'translate(' + (960 - i * 655) + ', 0)'"
          :characters="page"
        ></g>
      </g>
      <g class="caret" is="PaperCaret" transform="translate(885, 30)"></g>
    </svg>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Char } from "../classes";
import Paper from "./paper.vue";
import PaperCaret from "./paper-caret.vue";
import PaperInput from "./paper-input.vue";

@Component({ components: { Paper, PaperCaret, PaperInput } })
export default class Desk extends Vue {
  private rightCharacters: Char[] = [];
  private centerCharacters: Char[] = [];
  private leftCharacters: Char[] = [];
  private pages: [Char[], Char[], Char[]] = [[], [], []];
  private pageGap = 0;

  private get script() {
    return this.$store.state.script;
  }

  private get caret() {
    return this.$store.state.caret;
  }

  private mounted() {
    this.detectPages();
  }

  @Watch("caret.char.line")
  private lineUpdate(newValue: number, oldValue: number) {
    this.pageGap = Math.floor(newValue / 20) * 20;
  }

  @Watch("pageGap")
  private pageGapUpdate(newValue: number, oldValue: number) {
    this.detectPages();
  }

  @Watch("script.raw")
  private detectPages(newValue?: string, oldValue?: string) {
    const slice = (i: number) => {
      i = i + this.pageGap;
      const start =
        this.script.linePositionList[i] == null
          ? Infinity
          : this.script.linePositionList[i];
      const end = this.script.linePositionList[i + 20] || Infinity;
      return this.script.characters.slice(start, end);
    };
    this.rightCharacters.splice(0, Infinity, ...slice(-20));
    this.centerCharacters.splice(0, Infinity, ...slice(0));
    this.leftCharacters.splice(0, Infinity, ...slice(20));
    this.pages = [
      this.rightCharacters,
      this.centerCharacters,
      this.leftCharacters
    ];
  }

  private get charaLength() {
    return this.script.characters.length;
  }
}
</script>

<style scoped lang="scss">
main {
  background: url("~@/assets/desk-wood.jpg") no-repeat center / cover;
  display: flex;
}

svg {
  display: block;
  margin: auto;
  width: 100%;
}
</style>
