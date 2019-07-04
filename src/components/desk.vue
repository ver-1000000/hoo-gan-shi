<template>
  <main>
    <svg viewBox="0 0 1200 460" tabindex="-1">
      <g class="right" is="Paper" x="625" :characters="rightCharacters"></g>
      <!-- g class="center" is="Paper" x="0" :characters="centerCharacters"></g -->
      <!-- g class="left" is="Paper" x="-624" :characters="leftCharacters"></g -->
      <g is="PaperCaret" class="caret"></g>
    </svg>
    <output>{{ charaLength }}</output>
    <PaperInput />
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
  private get script() {
    return this.$store.state.script;
  }

  private get raw() {
    return this.script.raw;
  }

  mounted() {
    this.rawUpdate();
  }

  @Watch("raw")
  rawUpdate(newValue?: string, oldValue?: string) {
    const slice = (i: number) => {
      const start = this.script.linePositionList[i];
      const end = this.script.linePositionList[i + 20];
      return this.script.characters.slice(start, end);
    };
    this.rightCharacters.splice(0, Infinity, ...slice(0));
    this.centerCharacters.splice(0, Infinity, ...slice(20));
    this.leftCharacters.splice(0, Infinity, ...slice(40));
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
