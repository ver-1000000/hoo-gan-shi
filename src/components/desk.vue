<template>
  <main>
    <PaperInput />
    <output>{{ charaLength - 1 }}</output>
    <svg viewBox="0 0 1200 460" tabindex="-1">
      <g transform="translate(0, 30)">
        <g
          class="right"
          is="Paper"
          transform="translate(930, 0)"
          :characters="rightCharacters"
        ></g>
        <g
          class="center"
          is="Paper"
          transform="translate(305, 0)"
          :characters="centerCharacters"
        ></g>
        <g
          class="left"
          is="Paper"
          transform="translate(-320, 0)"
          :characters="leftCharacters"
        ></g>
        <g is="PaperCaret" class="caret"></g>
      </g>
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
  }

  private get charaLength() {
    return this.script.characters.length;
  }
}
</script>

<style scoped lang="scss">
svg {
  border: 0.4px solid black;
  box-sizing: border-box;
  display: block;
  width: 100%;
}

output {
  display: block;
}
</style>
